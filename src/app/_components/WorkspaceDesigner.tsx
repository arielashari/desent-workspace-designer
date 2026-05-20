'use client';

import { useState } from 'react';
import { DESKS, CHAIRS, ZONES, calculateTotal } from '~/lib/products';
import { WorkspacePreview } from './WorkspacePreview';
import { ProductPanel } from './ProductPanel';
import { ZoneSelector } from './ZoneSelector';
import { CheckoutModal } from './CheckoutModal';

export function WorkspaceDesigner() {
  const [selectedDesk, setSelectedDesk] = useState(DESKS[0]!.id);
  const [selectedChair, setSelectedChair] = useState(CHAIRS[0]!.id);
  const [accessories, setAccessories] = useState<Set<string>>(new Set());
  const [zones, setZones] = useState<Set<string>>(new Set());
  const [showCheckout, setShowCheckout] = useState(false);

  const toggleAccessory = (id: string) => {
    setAccessories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleZone = (id: string) => {
    setZones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const workspaceTotal = calculateTotal(selectedDesk, selectedChair, accessories);
  const zonesTotal = ZONES.filter((z) => zones.has(z.id)).reduce(
    (sum, z) => sum + z.price,
    0,
  );
  const total = workspaceTotal + zonesTotal;
  const itemCount = 2 + accessories.size + zones.size;

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#F5F0E8' }}>
      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-5 py-3 border-b shrink-0"
        style={{ background: '#FDFAF6', borderColor: '#E8DDD0' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🌴</span>
          <div>
            <p className="font-bold text-base leading-tight" style={{ color: '#2A1F14' }}>
              monis.rent
            </p>
            <p className="text-xs leading-tight opacity-40" style={{ color: '#2A1F14' }}>
              Workspace Designer · Bali
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm" style={{ color: '#2A1F14' }}>
            <span className="opacity-40">{itemCount} items · </span>
            <span className="font-bold" style={{ color: '#C85A3A' }}>
              ${total}
              <span className="font-normal opacity-40">/wk</span>
            </span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #C85A3A 0%, #A84030 100%)',
              boxShadow: '0 4px 16px rgba(200,90,58,0.3)',
            }}
          >
            Rent My Setup →
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="flex flex-1 overflow-hidden">
        <ProductPanel
          selectedDesk={selectedDesk}
          onDeskChange={setSelectedDesk}
          selectedChair={selectedChair}
          onChairChange={setSelectedChair}
          accessories={accessories}
          onToggleAccessory={toggleAccessory}
        />

        <main className="flex-1 overflow-hidden relative">
          <WorkspacePreview
            deskId={selectedDesk}
            chairId={selectedChair}
            accessories={accessories}
            zones={zones}
          />

          {accessories.size === 0 && zones.size === 0 && (
            <div
              className="absolute top-4 right-4 px-3 py-2 rounded-xl text-xs font-medium shadow-md pointer-events-none"
              style={{
                background: 'rgba(253,250,246,0.85)',
                color: '#8B7560',
                backdropFilter: 'blur(4px)',
              }}
            >
              ← Add accessories or a zone
            </div>
          )}
        </main>
      </div>

      {/* ── Zone strip ── */}
      <ZoneSelector selectedZones={zones} onToggle={toggleZone} />

      {/* ── Mobile bottom bar ── */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 border-t shrink-0"
        style={{ background: '#FDFAF6', borderColor: '#E8DDD0' }}
      >
        <div>
          <p className="text-xs opacity-40" style={{ color: '#2A1F14' }}>
            {itemCount} items
          </p>
          <p className="font-bold" style={{ color: '#C85A3A' }}>
            ${total}
            <span className="text-sm font-normal opacity-40" style={{ color: '#2A1F14' }}>
              /wk
            </span>
          </p>
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#C85A3A' }}
        >
          Rent My Setup →
        </button>
      </div>

      {showCheckout && (
        <CheckoutModal
          deskId={selectedDesk}
          chairId={selectedChair}
          accessories={accessories}
          zones={zones}
          total={total}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
