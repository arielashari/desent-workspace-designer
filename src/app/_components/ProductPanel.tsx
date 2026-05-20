'use client';

import Image from 'next/image';
import { useState } from 'react';
import { DESKS, CHAIRS, ACCESSORIES, type Product } from '~/lib/products';

type Tab = 'desks' | 'chairs' | 'accessories';

interface Props {
  selectedDesk: string;
  onDeskChange: (id: string) => void;
  selectedChair: string;
  onChairChange: (id: string) => void;
  accessories: Set<string>;
  onToggleAccessory: (id: string) => void;
}

export function ProductPanel({
  selectedDesk,
  onDeskChange,
  selectedChair,
  onChairChange,
  accessories,
  onToggleAccessory,
}: Props) {
  const [tab, setTab] = useState<Tab>('desks');

  return (
    <aside
      className="flex flex-col border-r overflow-hidden shrink-0"
      style={{ width: 272, borderColor: '#E8DDD0', background: '#FDFAF6' }}
    >
      {/* Tabs */}
      <div className="flex border-b shrink-0" style={{ borderColor: '#E8DDD0' }}>
        {(['desks', 'chairs', 'accessories'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
            style={{
              color: tab === t ? '#C85A3A' : '#8B7560',
              borderBottom: tab === t ? '2px solid #C85A3A' : '2px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sub-label */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs font-medium opacity-40" style={{ color: '#2A1F14' }}>
          {tab === 'desks' && 'Pick your desk'}
          {tab === 'chairs' && 'Pick your chair'}
          {tab === 'accessories' && 'Toggle extras on / off'}
        </p>
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {tab === 'desks' &&
          DESKS.map((desk) => (
            <ProductCard
              key={desk.id}
              product={desk}
              selected={selectedDesk === desk.id}
              onSelect={() => onDeskChange(desk.id)}
              mode="radio"
            />
          ))}
        {tab === 'chairs' &&
          CHAIRS.map((chair) => (
            <ProductCard
              key={chair.id}
              product={chair}
              selected={selectedChair === chair.id}
              onSelect={() => onChairChange(chair.id)}
              mode="radio"
            />
          ))}
        {tab === 'accessories' &&
          ACCESSORIES.map((acc) => (
            <ProductCard
              key={acc.id}
              product={acc}
              selected={accessories.has(acc.id)}
              onSelect={() => onToggleAccessory(acc.id)}
              mode="toggle"
            />
          ))}
      </div>

      <div
        className="shrink-0 px-4 py-3 border-t text-center text-xs opacity-30"
        style={{ borderColor: '#E8DDD0', color: '#2A1F14' }}
      >
        🌴 Delivered to your door in Bali
      </div>
    </aside>
  );
}

interface CardProps {
  product: Product;
  selected: boolean;
  onSelect: () => void;
  mode: 'radio' | 'toggle';
}

function ProductCard({ product, selected, onSelect, mode }: CardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left rounded-xl border-2 overflow-hidden transition-all duration-150"
      style={{
        borderColor: selected ? '#C85A3A' : '#E8DDD0',
        background: selected ? '#FFF5F2' : 'white',
        transform: selected ? 'scale(1.01)' : 'scale(1)',
        boxShadow: selected
          ? '0 2px 12px rgba(200,90,58,0.15)'
          : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Image or emoji */}
      {product.image ? (
        <div className="relative w-full" style={{ height: 100, background: '#F5F0E8' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
          {selected && (
            <div className="absolute inset-0" style={{ background: 'rgba(200,90,58,0.08)' }} />
          )}
        </div>
      ) : (
        <div
          className="flex items-center justify-center text-4xl py-5"
          style={{ background: selected ? '#FFE8E0' : '#F5F0E8' }}
        >
          {product.emoji}
        </div>
      )}

      {/* Info */}
      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate" style={{ color: '#2A1F14' }}>
              {product.name}
            </p>
            <p className="text-xs mt-0.5 opacity-50 leading-tight" style={{ color: '#2A1F14' }}>
              {product.tagline}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="font-bold text-sm" style={{ color: '#C85A3A' }}>
              ${product.price}
              <span className="text-xs font-normal opacity-60">/wk</span>
            </span>
            {mode === 'toggle' && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={
                  selected
                    ? { background: '#C85A3A', color: 'white' }
                    : { background: '#F0EBE4', color: '#8B7560' }
                }
              >
                {selected ? '✓' : '+'}
              </span>
            )}
            {mode === 'radio' && selected && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: '#C85A3A', color: 'white' }}
              >
                ✓
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
