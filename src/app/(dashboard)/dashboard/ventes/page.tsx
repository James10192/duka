"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Check,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PAYMENT_METHODS } from "@/lib/constants";
import { formatCFA } from "@/lib/utils";
import { getUserOrganizations } from "@/actions/organizations";
import { getProducts } from "@/actions/products";
import { getClients } from "@/actions/clients";
import { createSale } from "@/actions/sales";
import type { PaymentMethod } from "@/generated/prisma/client";
import { toast } from "sonner";

type ProductItem = {
  id: string;
  name: string;
  ref: string;
  sellPrice: number;
  stock: number;
  category: string | null;
};

type ClientItem = {
  id: string;
  name: string;
  phone: string | null;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  maxStock: number;
};

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("CASH");
  const [orgId, setOrgId] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const loadData = useCallback(async (oId: string) => {
    try {
      const [productsData, clientsData] = await Promise.all([
        getProducts(oId),
        getClients(oId),
      ]);
      setProducts(productsData);
      setClients(clientsData);
    } catch (err) {
      console.error("Failed to load POS data", err);
    }
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const orgs = await getUserOrganizations();
        const org = orgs[0];
        if (!org) return;
        const store = org.stores[0];
        if (!store) return;
        setOrgId(org.id);
        setStoreId(store.id);
        await loadData(org.id);
      } catch (err) {
        console.error("Failed to init POS", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [loadData]);

  function addToCart(product: ProductItem) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.error("Stock insuffisant");
          return prev;
        }
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      if (product.stock <= 0) {
        toast.error("Produit en rupture de stock");
        return prev;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.sellPrice,
          quantity: 1,
          maxStock: product.stock,
        },
      ];
    });
  }

  function updateQuantity(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;
          const newQty = Math.max(0, i.quantity + delta);
          if (newQty > i.maxStock) {
            toast.error("Stock insuffisant");
            return i;
          }
          return { ...i, quantity: newQty };
        })
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleValidateSale() {
    if (!orgId || !storeId || cart.length === 0) return;

    setSubmitting(true);
    try {
      await createSale({
        orgId,
        storeId,
        clientId: selectedClient || undefined,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        paymentMethod: selectedPayment,
        discount: discount > 0 ? discount : undefined,
      });

      toast.success("Vente enregistree avec succes");
      setCart([]);
      setDiscount(0);
      setSelectedClient("");

      // Reload products to refresh stock
      await loadData(orgId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la vente";
      toast.error(message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const filteredProducts = products.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ref.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <p className="text-muted-foreground">Chargement du point de vente...</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Product selection */}
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
        </div>

        <Card className="flex-1 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingCart className="h-4 w-4" />
              Produits ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 16rem)" }}>
            {filteredProducts.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                {products.length === 0
                  ? "Ajoutez des produits pour commencer une vente"
                  : "Aucun produit ne correspond a la recherche"}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    className="rounded-lg border border-border p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{product.ref}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold">
                        {formatCFA(product.sellPrice)}
                      </span>
                      <Badge
                        variant={product.stock > 0 ? "secondary" : "destructive"}
                        className="text-xs font-mono"
                      >
                        {product.stock}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cart */}
      <Card className="flex w-96 flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Panier
            </span>
            {cart.length > 0 && (
              <Badge variant="secondary">{cart.length} article(s)</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          {/* Client selection */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              >
                <option value="">Client comptoir</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.phone ? `(${c.phone})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Separator className="mb-3" />

          {cart.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Panier vide
            </div>
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatCFA(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Separator className="my-3" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-mono">
                {formatCFA(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Remise</span>
              <input
                type="number"
                min="0"
                max={subtotal}
                value={discount || ""}
                onChange={(e) => setDiscount(parseInt(e.target.value, 10) || 0)}
                placeholder="0"
                className="w-28 rounded border border-input bg-background px-2 py-1 text-right font-mono text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="font-mono">
                {formatCFA(total)}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map((method) => (
              <Button
                key={method.id}
                variant={selectedPayment === method.id ? "default" : "outline"}
                className="h-10 text-xs"
                disabled={cart.length === 0}
                onClick={() => setSelectedPayment(method.id as PaymentMethod)}
              >
                {selectedPayment === method.id && <Check className="mr-1 h-3 w-3" />}
                {method.label}
              </Button>
            ))}
          </div>
          <Button
            className="mt-2 h-12 w-full"
            disabled={cart.length === 0 || submitting}
            onClick={handleValidateSale}
          >
            {submitting ? "Validation en cours..." : "Valider la vente"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
