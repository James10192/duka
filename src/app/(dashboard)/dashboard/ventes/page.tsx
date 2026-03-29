"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PAYMENT_METHODS } from "@/lib/constants";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax - discount;

  function addToCart(product: { id: string; name: string; price: number }) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
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

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Produits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Ajoutez des produits pour commencer une vente
            </div>
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
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {item.price.toLocaleString("fr-FR")} FCFA
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
                {subtotal.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">TVA (18%)</span>
              <span className="font-mono">
                {tax.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-destructive">
                <span>Remise</span>
                <span className="font-mono">
                  -{discount.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="font-mono">
                {total.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.slice(0, 2).map((method) => (
              <Button
                key={method.id}
                variant="outline"
                className="h-12"
                disabled={cart.length === 0}
              >
                {method.label}
              </Button>
            ))}
          </div>
          <Button className="mt-2 h-12 w-full" disabled={cart.length === 0}>
            Valider la vente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
