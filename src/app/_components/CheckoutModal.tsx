'use client';

import { useState } from 'react';
import { DESKS, CHAIRS, ACCESSORIES, ZONES } from '~/lib/products';

interface Props {
  deskId: string;
  chairId: string;
  accessories: Set<string>;
  zones: Set<string>;
  total: number;
  onClose: () => void;
}

const DURATIONS = [
  { weeks: 1, label: '1 wk', discount: 0 },
  { weeks: 2, label: '2 wk', discount: 5 },
  { weeks: 4, label: '1 mo', discount: 10 },
  { weeks: 12, label: '3 mo', discount: 20 },
];

export function CheckoutModal({ deskId, chairId, accessories, zones, total, onClose }: Props) {
  const [duration, setDuration] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const desk = DESKS.find((d) => d.id === deskId);
  const chair = CHAIRS.find((c) => c.id === chairId);
  const selectedAccessories = ACCESSORIES.filter((a) => accessories.has(a.id));
  const selectedZones = ZONES.filter((z) => zones.has(z.id));
  const dur = DURATIONS.find((d) => d.weeks === duration)!;
  const weeklyAfterDiscount = total * (1 - dur.discount / 100);
  const grandTotal = Math.round(weeklyAfterDiscount * duration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: 'rgba(42,31,20,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl checkout-slide-up"
        style={{ background: '#FDFAF6' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-5 py-4 border-b rounded-t-2xl z-10"
          style={{ borderColor: '#E8DDD0', background: '#FDFAF6' }}
        >
          <div>
            <p className="font-bold text-base" style={{ color: '#2A1F14' }}>
              Your Setup
            </p>
            <p className="text-xs opacity-40" style={{ color: '#2A1F14' }}>
              Review &amp; confirm rental
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-colors hover:bg-gray-100"
            style={{ color: '#2A1F14' }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <SuccessView name={name} onClose={onClose} />
        ) : (
          <>
            {/* Items */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-40 mb-2" style={{ color: '#2A1F14' }}>
                Items
              </p>
              {desk && <LineItem emoji={desk.emoji} name={desk.name} price={desk.price} />}
              {chair && <LineItem emoji={chair.emoji} name={chair.name} price={chair.price} />}
              {selectedAccessories.map((acc) => (
                <LineItem key={acc.id} emoji={acc.emoji} name={acc.name} price={acc.price} />
              ))}
            </div>

            {/* Zones */}
            {selectedZones.length > 0 && (
              <div className="px-5 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-40 mb-2" style={{ color: '#2A1F14' }}>
                  Add-On Zones
                </p>
                {selectedZones.map((zone) => (
                  <LineItem key={zone.id} emoji={zone.emoji} name={zone.name} price={zone.price} />
                ))}
              </div>
            )}

            {/* Duration */}
            <div className="px-5 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-40 mb-2" style={{ color: '#2A1F14' }}>
                Duration
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {DURATIONS.map((d) => (
                  <button
                    key={d.weeks}
                    onClick={() => setDuration(d.weeks)}
                    className="py-2.5 rounded-lg text-xs font-semibold border-2 transition-all"
                    style={{
                      borderColor: duration === d.weeks ? '#C85A3A' : '#E8DDD0',
                      background: duration === d.weeks ? '#C85A3A' : 'white',
                      color: duration === d.weeks ? 'white' : '#2A1F14',
                    }}
                  >
                    {d.label}
                    {d.discount > 0 && (
                      <span
                        className="block text-[10px] font-normal opacity-75 mt-0.5"
                      >
                        -{d.discount}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mx-5 mb-4 rounded-xl p-4" style={{ background: '#FFF5F2' }}>
              <div
                className="flex justify-between text-xs opacity-60 mb-1.5"
                style={{ color: '#2A1F14' }}
              >
                <span>
                  ${Math.round(weeklyAfterDiscount)}/wk × {duration}{' '}
                  {duration === 1 ? 'week' : 'weeks'}
                </span>
                {dur.discount > 0 && (
                  <span style={{ color: '#16A34A' }}>-{dur.discount}% off</span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm" style={{ color: '#2A1F14' }}>
                  Total due now
                </span>
                <span className="text-2xl font-bold" style={{ color: '#C85A3A' }}>
                  ${grandTotal}
                </span>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="px-5 pb-6 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-40" style={{ color: '#2A1F14' }}>
                Your Details
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-3.5 py-2.5 rounded-lg text-sm border outline-none transition-shadow"
                style={{
                  borderColor: '#E8DDD0',
                  background: 'white',
                  color: '#2A1F14',
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C85A3A')}
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                required
                className="w-full px-3.5 py-2.5 rounded-lg text-sm border outline-none transition-shadow"
                style={{ borderColor: '#E8DDD0', background: 'white', color: '#2A1F14' }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C85A3A')}
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp / Phone (optional)"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm border outline-none transition-shadow"
                style={{ borderColor: '#E8DDD0', background: 'white', color: '#2A1F14' }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 2px #C85A3A')}
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #C85A3A 0%, #A84030 100%)',
                  boxShadow: '0 4px 20px rgba(200,90,58,0.35)',
                }}
              >
                🌴 Confirm Rental in Bali
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function LineItem({ emoji, name, price }: { emoji: string; name: string; price: number }) {
  return (
    <div
      className="flex items-center justify-between py-2 border-b"
      style={{ borderColor: '#F0EAE2' }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-lg">{emoji}</span>
        <span className="text-sm font-medium" style={{ color: '#2A1F14' }}>
          {name}
        </span>
      </div>
      <span className="text-sm font-semibold" style={{ color: '#C85A3A' }}>
        ${price}/wk
      </span>
    </div>
  );
}

function SuccessView({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="px-8 py-10 text-center">
      <div className="text-5xl mb-4 animate-bounce">🌴</div>
      <p className="font-bold text-xl mb-2" style={{ color: '#2A1F14' }}>
        You&apos;re all set, {name}!
      </p>
      <p className="text-sm opacity-60 mb-6 leading-relaxed" style={{ color: '#2A1F14' }}>
        We&apos;ll reach out within 24 hours to confirm your workspace delivery in Bali.
      </p>
      <div
        className="rounded-xl p-4 mb-6 text-sm text-left"
        style={{ background: '#F0FDF4', color: '#15803D' }}
      >
        📧 Check your email for confirmation details.
      </div>
      <button
        onClick={onClose}
        className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-80"
        style={{ background: '#2A1F14' }}
      >
        Back to Designer
      </button>
    </div>
  );
}
