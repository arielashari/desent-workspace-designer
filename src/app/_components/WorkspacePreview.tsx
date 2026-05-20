'use client';

import { DESKS, CHAIRS } from '~/lib/products';

interface Props {
  deskId: string;
  chairId: string;
  accessories: Set<string>;
  zones: Set<string>;
}

export function WorkspacePreview({ deskId, chairId, accessories, zones }: Props) {
  const desk = DESKS.find((d) => d.id === deskId);
  const chair = CHAIRS.find((c) => c.id === chairId);

  const isElectric = deskId === 'desk-electric';
  const isErgonomic = chairId === 'chair-ergonomic';

  const has24Monitor = accessories.has('acc-monitor-24');
  const has27Monitor = accessories.has('acc-monitor-27');
  const hasLamp = accessories.has('acc-lamp');
  const hasPlant = accessories.has('acc-plant');
  const hasKeyboard = accessories.has('acc-keyboard');
  const hasMouse = accessories.has('acc-mouse');

  const hasCoffee = zones.has('zone-coffee');
  const hasRelax = zones.has('zone-relax');
  const hasFitness = zones.has('zone-fitness');
  const hasOutdoor = zones.has('zone-outdoor');

  const deskSurface = isElectric ? '#B8B8C8' : '#C8A070';
  const deskMid = isElectric ? '#A8A8B8' : '#B89060';
  const deskFront = isElectric ? '#888898' : '#7B5030';
  const deskLeg = isElectric ? '#787888' : '#6B4025';

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg, #EAE0D0 0%, #DED0BC 55%, #C8BC9C 100%)',
      }}
    >
      {/* Tropical light rays */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 280,
          height: 280,
          background:
            'radial-gradient(circle at top right, rgba(254,249,195,0.5) 0%, transparent 65%)',
        }}
      />

      {/* Palm silhouette */}
      <div
        className="absolute top-0 left-2 pointer-events-none text-7xl leading-none opacity-[0.07]"
        style={{ transform: 'rotate(-10deg) scale(1.4)', transformOrigin: 'top left' }}
        aria-hidden="true"
      >
        🌴
      </div>

      {/* Floor line */}
      <div
        className="absolute left-0 right-0"
        style={{ top: '60%', height: 1, background: '#B0A080', opacity: 0.3 }}
      />

      {/* Zone: Coffee Station — top left */}
      {hasCoffee && (
        <div
          className="scene-item-enter absolute flex flex-col items-center gap-1"
          style={{ top: 24, left: 20 }}
        >
          <div
            className="rounded-lg shadow-md flex flex-col items-center justify-end pb-1"
            style={{ width: 38, height: 50, background: 'linear-gradient(180deg, #3D2008 0%, #5C2E0A 100%)', border: '2px solid #8B4513' }}
          >
            <div className="rounded-full" style={{ width: 18, height: 6, background: '#8B4513' }} />
            <div className="rounded-full mt-0.5" style={{ width: 10, height: 10, background: '#1A0A00', border: '2px solid #8B4513' }} />
          </div>
          <div
            className="rounded-full px-1.5 py-0.5 text-white font-semibold"
            style={{ fontSize: 8, background: '#8B4513', whiteSpace: 'nowrap' }}
          >
            ☕ Coffee
          </div>
        </div>
      )}

      {/* Zone: Fitness Corner — top right */}
      {hasFitness && (
        <div
          className="scene-item-enter absolute flex flex-col items-center gap-1"
          style={{ top: 24, right: 20 }}
        >
          <div
            className="rounded-xl shadow-md flex items-center justify-center"
            style={{ width: 56, height: 20, background: 'linear-gradient(180deg, #16A34A 0%, #15803D 100%)', border: '2px solid #15803D' }}
          >
            <div className="rounded-full" style={{ width: 44, height: 6, background: '#22C55E', opacity: 0.6 }} />
          </div>
          <div className="rounded" style={{ width: 56, height: 8, background: '#166534' }} />
          <div
            className="rounded-full px-1.5 py-0.5 text-white font-semibold"
            style={{ fontSize: 8, background: '#16A34A', whiteSpace: 'nowrap' }}
          >
            🏃 Walking Pad
          </div>
        </div>
      )}

      {/* Zone: Relax Zone — bottom right */}
      {hasRelax && (
        <div
          className="scene-item-enter absolute flex flex-col items-end gap-1"
          style={{ bottom: 32, right: 16 }}
        >
          <div
            className="rounded-full px-1.5 py-0.5 text-white font-semibold"
            style={{ fontSize: 8, background: '#2D7A7A', whiteSpace: 'nowrap' }}
          >
            🛋️ Relax Zone
          </div>
          <div
            className="rounded-2xl shadow-md"
            style={{
              width: 54,
              height: 36,
              background: 'linear-gradient(135deg, #2D7A7A 0%, #1A5252 100%)',
              border: '2px solid #2D7A7A',
              borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
            }}
          />
          <div className="rounded" style={{ width: 30, height: 6, background: '#1A5252' }} />
        </div>
      )}

      {/* Zone: Outdoor Bali — bottom left */}
      {hasOutdoor && (
        <div
          className="scene-item-enter absolute flex flex-col items-start gap-1"
          style={{ bottom: 32, left: 16 }}
        >
          <div
            className="rounded-full px-1.5 py-0.5 text-white font-semibold"
            style={{ fontSize: 8, background: '#C85A3A', whiteSpace: 'nowrap' }}
          >
            🌴 Outdoor
          </div>
          {/* Hammock */}
          <div style={{ position: 'relative', width: 60, height: 30 }}>
            <div style={{ position: 'absolute', top: 0, left: 4, width: 3, height: 28, background: '#8B6914', borderRadius: 2 }} />
            <div style={{ position: 'absolute', top: 0, right: 4, width: 3, height: 28, background: '#8B6914', borderRadius: 2 }} />
            <div style={{
              position: 'absolute',
              top: 8,
              left: 7,
              right: 7,
              height: 16,
              background: 'linear-gradient(180deg, #C85A3A 0%, #A84030 100%)',
              borderRadius: '0 0 50% 50%',
              border: '1px solid #A84030',
            }} />
          </div>
        </div>
      )}

      {/* Centered desk scene */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
        <div
          className="relative flex flex-col items-center"
          style={{ width: 'min(80%, 540px)' }}
        >
          {/* Monitor row — above desk */}
          <div
            className="flex items-end justify-center gap-3 mb-1"
            style={{ height: 80 }}
          >
            {has24Monitor && (
              <Monitor
                size={has24Monitor && has27Monitor ? 'sm' : 'md'}
                label="24 FHD"
              />
            )}
            {has27Monitor && (
              <Monitor
                size={has24Monitor && has27Monitor ? 'md' : 'lg'}
                label="27 4K"
              />
            )}
            {!has24Monitor && !has27Monitor && (
              <p
                className="text-xs font-medium pb-3 opacity-30"
                style={{ color: '#6B5040' }}
              >
                + add a monitor above
              </p>
            )}
          </div>

          {/* Desk surface */}
          <div
            className="relative w-full rounded-t-lg shadow-2xl overflow-hidden"
            style={{
              height: isElectric ? 132 : 116,
              background: `linear-gradient(180deg, ${deskSurface} 0%, ${deskMid} 100%)`,
            }}
          >
            {/* Wood/material grain */}
            <div className="absolute inset-0 pointer-events-none opacity-15">
              {[24, 48, 72, 96].map((y) => (
                <div
                  key={y}
                  className="absolute left-0 right-0"
                  style={{ top: y, height: 1, background: deskFront }}
                />
              ))}
            </div>

            {/* Electric standing column */}
            {isElectric && (
              <div
                className="absolute right-3 top-0 bottom-0 flex flex-col items-center justify-center"
                style={{ width: 8 }}
              >
                <div
                  className="flex-1 rounded-full"
                  style={{ width: 3, background: '#888898' }}
                />
                <div
                  className="rounded-full border-2"
                  style={{
                    width: 10,
                    height: 10,
                    borderColor: '#9CA3AF',
                    background: '#D1D5DB',
                    margin: '3px 0',
                  }}
                />
              </div>
            )}

            {/* Items on desk */}
            <div
              className="absolute inset-0 flex items-center px-6"
              style={{ gap: 8 }}
            >
              {/* Left: Plant */}
              <div className="flex items-end" style={{ minWidth: 44 }}>
                {hasPlant ? (
                  <Plant />
                ) : (
                  <div
                    className="rounded-full border-2 border-dashed opacity-20"
                    style={{ width: 36, height: 36, borderColor: deskFront }}
                  />
                )}
              </div>

              {/* Center: Keyboard + Mouse */}
              <div className="flex-1 flex items-end justify-center gap-2">
                {hasKeyboard ? (
                  <Keyboard />
                ) : (
                  <div
                    className="rounded border-2 border-dashed opacity-20"
                    style={{ width: 88, height: 22, borderColor: deskFront }}
                  />
                )}
                {hasMouse && <Mouse />}
              </div>

              {/* Right: Lamp */}
              <div
                className="flex items-end justify-end"
                style={{ minWidth: 44 }}
              >
                {hasLamp ? (
                  <Lamp />
                ) : (
                  <div
                    className="rounded-t-full border-2 border-dashed opacity-20"
                    style={{ width: 22, height: 44, borderColor: deskFront }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Desk front face */}
          <div
            className="w-full"
            style={{
              height: 16,
              background: deskFront,
              borderRadius: '0 0 4px 4px',
            }}
          />

          {/* Desk legs */}
          <div className="flex w-full justify-between px-6">
            <div
              style={{
                width: 14,
                height: 22,
                background: deskLeg,
                borderRadius: '0 0 4px 4px',
              }}
            />
            <div
              style={{
                width: 14,
                height: 22,
                background: deskLeg,
                borderRadius: '0 0 4px 4px',
              }}
            />
          </div>

          {/* Chair */}
          <div className="mt-2">
            <Chair isErgonomic={isErgonomic} />
          </div>
        </div>
      </div>

      {/* Scene label */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium"
        style={{ background: 'rgba(0,0,0,0.08)', color: '#5A4030' }}
      >
        {desk?.name} · {chair?.name}
      </div>
    </div>
  );
}

/* ── Furniture components ─────────────────────────────── */

function Monitor({ size, label }: { size: 'sm' | 'md' | 'lg'; label: string }) {
  const dims =
    { sm: [80, 52], md: [100, 65], lg: [116, 74] }[size] ?? [100, 65];
  const [w, h] = dims as [number, number];
  return (
    <div className="scene-item-enter flex flex-col items-center">
      <div
        className="relative rounded-sm shadow-xl overflow-hidden"
        style={{
          width: w,
          height: h,
          background: '#111827',
          border: '1px solid #374151',
        }}
      >
        <div
          className="absolute inset-1 rounded-sm"
          style={{
            background:
              'linear-gradient(135deg, #0F172A 0%, #1E3A5F 55%, #0D2040 100%)',
          }}
        />
        <div
          className="absolute rounded-full opacity-30"
          style={{ top: 6, right: 8, width: 18, height: 5, background: 'white' }}
        />
        <div
          className="absolute"
          style={{
            bottom: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 8,
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>
      <div style={{ width: 2, height: 12, background: '#4B5563' }} />
      <div
        className="rounded-full"
        style={{ width: w * 0.4, height: 4, background: '#374151' }}
      />
    </div>
  );
}

function Lamp() {
  return (
    <div
      className="scene-item-enter flex flex-col items-center"
      style={{ height: 64 }}
    >
      <div
        style={{
          width: 30,
          height: 18,
          background: '#FDE68A',
          clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
          boxShadow: '0 0 16px rgba(253,230,138,0.6)',
        }}
      />
      <div
        style={{
          width: 2,
          flex: 1,
          background: '#78716C',
          transform: 'rotate(-8deg)',
          transformOrigin: 'bottom center',
          borderRadius: 2,
        }}
      />
      <div
        className="rounded-full"
        style={{ width: 26, height: 6, background: '#57534E' }}
      />
    </div>
  );
}

function Plant() {
  return (
    <div className="scene-item-enter flex flex-col items-center">
      <div
        className="relative rounded-full shadow-md"
        style={{
          width: 38,
          height: 32,
          background:
            'radial-gradient(circle at 38% 32%, #4ADE80 0%, #16A34A 55%, #15803D 100%)',
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            top: 4,
            left: 18,
            width: 14,
            height: 20,
            background: 'radial-gradient(circle, #4ADE80 0%, #166534 100%)',
            transform: 'rotate(25deg)',
          }}
        />
      </div>
      <div
        style={{
          width: 28,
          height: 18,
          marginTop: 1,
          background: 'linear-gradient(180deg, #C2410C 0%, #9A3412 100%)',
          clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
        }}
      />
    </div>
  );
}

function Keyboard() {
  return (
    <div className="scene-item-enter">
      <div
        className="relative rounded shadow-md"
        style={{
          width: 104,
          height: 36,
          background: '#E5E7EB',
          border: '1px solid #D1D5DB',
          padding: 4,
        }}
      >
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex gap-0.5 mb-0.5">
            {Array.from({ length: row === 0 ? 12 : row === 1 ? 11 : 10 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="rounded-sm flex-1"
                  style={{
                    height: 6,
                    background: '#D1D5DB',
                    border: '1px solid #9CA3AF',
                  }}
                />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Mouse() {
  return (
    <div className="scene-item-enter flex flex-col items-center">
      <div
        style={{
          width: 22,
          height: 32,
          background: 'linear-gradient(180deg, #D1D5DB 0%, #9CA3AF 100%)',
          borderRadius: '50% 50% 40% 40%',
          border: '1px solid #9CA3AF',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 1,
            height: 14,
            background: '#9CA3AF',
            margin: '6px auto 0',
          }}
        />
      </div>
    </div>
  );
}

function Chair({ isErgonomic }: { isErgonomic: boolean }) {
  const backBg = isErgonomic
    ? 'linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)'
    : 'linear-gradient(180deg, #A0855A 0%, #7B6040 100%)';
  const seatBg = isErgonomic ? '#4B5563' : '#6B5030';
  const armBg = isErgonomic ? '#374151' : '#5A4025';
  const baseBg = isErgonomic ? '#6B7280' : '#7B6040';
  const backH = isErgonomic ? 62 : 76;

  return (
    <div
      className="scene-item-enter relative flex flex-col items-center"
      style={{ width: 96 }}
    >
      {/* Back */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          height: backH,
          borderRadius: '14px 14px 4px 4px',
          background: backBg,
        }}
      >
        {isErgonomic && (
          <div className="absolute inset-0 opacity-22">
            {[10, 20, 30, 40, 50].map((y) => (
              <div
                key={y}
                className="absolute left-2 right-2 bg-white"
                style={{ top: y, height: 1 }}
              />
            ))}
            {[25, 50, 75].map((x) => (
              <div
                key={x}
                className="absolute top-2 bottom-2 bg-white"
                style={{ left: `${x}%`, width: 1 }}
              />
            ))}
          </div>
        )}
        {!isErgonomic && (
          <div
            className="absolute inset-x-3 inset-y-3 rounded border opacity-15"
            style={{ borderColor: 'white' }}
          />
        )}
      </div>

      {/* Armrests */}
      <div
        className="absolute flex justify-between w-full"
        style={{ top: isErgonomic ? 40 : 52 }}
      >
        <div
          className="rounded"
          style={{ width: 10, height: 18, background: armBg }}
        />
        <div
          className="rounded"
          style={{ width: 10, height: 18, background: armBg }}
        />
      </div>

      {/* Seat */}
      <div
        className="w-full mt-1 rounded shadow-xl"
        style={{ height: 18, background: seatBg }}
      />

      {/* Gas cylinder */}
      <div
        className="rounded-full"
        style={{ width: 6, height: 16, background: baseBg }}
      />

      {/* Star base */}
      <div
        className="rounded-full"
        style={{ width: 54, height: 5, background: baseBg }}
      />

      {/* Wheels */}
      <div className="flex justify-between" style={{ width: 54 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full"
            style={{ width: 8, height: 4, background: '#374151' }}
          />
        ))}
      </div>
    </div>
  );
}
