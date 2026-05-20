'use client';

import { ZONES } from '~/lib/products';

interface Props {
  selectedZones: Set<string>;
  onToggle: (id: string) => void;
}

export function ZoneSelector({ selectedZones, onToggle }: Props) {
  return (
    <div
      className="shrink-0 border-t"
      style={{ borderColor: '#E8DDD0', background: '#FDFAF6' }}
    >
      <div className="px-4 pt-2.5 pb-1 flex items-center gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-wider opacity-40"
          style={{ color: '#2A1F14' }}
        >
          Add a Zone
        </p>
        <div
          className="h-px flex-1 opacity-20"
          style={{ background: '#2A1F14' }}
        />
        <p className="text-xs opacity-30" style={{ color: '#2A1F14' }}>
          Extras beyond your desk
        </p>
      </div>

      <div className="flex gap-2.5 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {ZONES.map((zone) => {
          const active = selectedZones.has(zone.id);
          return (
            <button
              key={zone.id}
              onClick={() => onToggle(zone.id)}
              className="flex-none flex items-center gap-3 rounded-xl border-2 px-4 py-2.5 transition-all duration-150 text-left"
              style={{
                borderColor: active ? zone.color : '#E8DDD0',
                background: active ? `${zone.color}14` : 'white',
                minWidth: 200,
                transform: active ? 'scale(1.02)' : 'scale(1)',
                boxShadow: active
                  ? `0 2px 12px ${zone.color}28`
                  : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Emoji */}
              <span
                className="text-2xl shrink-0"
                style={{ filter: active ? 'none' : 'grayscale(0.3)' }}
              >
                {zone.emoji}
              </span>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p
                  className="font-semibold text-sm leading-tight"
                  style={{ color: '#2A1F14' }}
                >
                  {zone.name}
                </p>
                <p
                  className="text-xs opacity-40 leading-tight mt-0.5 truncate"
                  style={{ color: '#2A1F14' }}
                >
                  {zone.items.join(' · ')}
                </p>
              </div>

              {/* Price + badge */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="font-bold text-sm"
                  style={{ color: active ? zone.color : '#C85A3A' }}
                >
                  +${zone.price}
                  <span
                    className="text-xs font-normal opacity-60"
                    style={{ color: active ? zone.color : '#C85A3A' }}
                  >
                    /wk
                  </span>
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={
                    active
                      ? { background: zone.color, color: 'white' }
                      : { background: '#F0EBE4', color: '#8B7560' }
                  }
                >
                  {active ? '✓' : '+'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
