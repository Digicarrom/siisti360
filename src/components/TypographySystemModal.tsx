import React, { useState } from 'react';
import {
  X,
  Type,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronRight,
  Sliders,
  Palette,
  Layers,
  ExternalLink,
} from 'lucide-react';

interface TypographySystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDeviceView: 'auto' | 'desktop' | 'tablet' | 'mobile';
  onChangeDeviceView: (mode: 'auto' | 'desktop' | 'tablet' | 'mobile') => void;
}

export const TypographySystemModal: React.FC<TypographySystemModalProps> = ({
  isOpen,
  onClose,
  activeDeviceView,
  onChangeDeviceView,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | '8points' | 'tester'>('overview');
  const [testText, setTestText] = useState('Siisti360 — Laadukkaat siivouspalvelut koteihin ja toimitiloihin');
  const [simulatedWidth, setSimulatedWidth] = useState<number>(1200);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1827]/75 p-3 sm:p-5 backdrop-blur-xs overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="typography-modal-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-2xl border border-[#cbdce4] bg-white text-[#142c42] shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#e2e9ee] bg-[#f8fafc] px-6 py-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10263d] text-white shadow-xs">
              <Type className="h-5 w-5 text-[#ff8d43]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="typography-modal-title" className="text-lg font-[820] text-[#10263d]">
                  Siisti360 Typography Design System
                </h3>
                <span className="rounded-md bg-[#e5f6f1] px-2 py-0.5 text-[11px] font-bold text-[#087f72] font-mono">
                  8-POINT GUIDE ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#677c8d]">
                Desktop, Tablet & Mobile friendly typography scale per Siisti360 8-Point Standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Viewport Simulation Buttons */}
            <div className="flex items-center rounded-xl border border-[#cbdce4] bg-white p-1 text-xs shadow-2xs">
              <button
                onClick={() => {
                  onChangeDeviceView('auto');
                  setSimulatedWidth(1200);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                  activeDeviceView === 'auto'
                    ? 'bg-[#10263d] text-white font-bold'
                    : 'text-[#677c8d] hover:text-[#10263d]'
                }`}
                title="Automaattinen näytön koko"
              >
                <span>Auto</span>
              </button>
              <button
                onClick={() => {
                  onChangeDeviceView('desktop');
                  setSimulatedWidth(1400);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                  activeDeviceView === 'desktop'
                    ? 'bg-[#10263d] text-white font-bold'
                    : 'text-[#677c8d] hover:text-[#10263d]'
                }`}
                title="Desktop 1440px"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => {
                  onChangeDeviceView('tablet');
                  setSimulatedWidth(820);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                  activeDeviceView === 'tablet'
                    ? 'bg-[#10263d] text-white font-bold'
                    : 'text-[#677c8d] hover:text-[#10263d]'
                }`}
                title="Tablet 768-900px"
              >
                <Tablet className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => {
                  onChangeDeviceView('mobile');
                  setSimulatedWidth(390);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                  activeDeviceView === 'mobile'
                    ? 'bg-[#10263d] text-white font-bold'
                    : 'text-[#677c8d] hover:text-[#10263d]'
                }`}
                title="Mobile <=680px"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#cbdce4] bg-white text-[#677c8d] hover:bg-[#f1f5f8] hover:text-[#10263d] transition-colors"
              aria-label="Sulje"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e2e9ee] bg-white px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`border-b-2 px-4 py-3 text-[13.5px] font-[750] transition-colors ${
              activeTab === 'overview'
                ? 'border-[#0d9d8c] text-[#087f72]'
                : 'border-transparent text-[#677c8d] hover:text-[#142c42]'
            }`}
          >
            Yleiskatsaus & Skaalat
          </button>
          <button
            onClick={() => setActiveTab('8points')}
            className={`border-b-2 px-4 py-3 text-[13.5px] font-[750] transition-colors ${
              activeTab === '8points'
                ? 'border-[#0d9d8c] text-[#087f72]'
                : 'border-transparent text-[#677c8d] hover:text-[#142c42]'
            }`}
          >
            Kaikki 8 Kohtaa (PDF Speksi)
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`border-b-2 px-4 py-3 text-[13.5px] font-[750] transition-colors ${
              activeTab === 'tester'
                ? 'border-[#0d9d8c] text-[#087f72]'
                : 'border-transparent text-[#677c8d] hover:text-[#142c42]'
            }`}
          >
            Interaktiivinen Typografiatestaaja
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Device Mode Status Bar */}
              <div className="flex flex-wrap items-center justify-between rounded-xl border border-[#e2e9ee] bg-[#f8fafc] p-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#10263d]">Nykyinen katselutila:</span>
                  <span className="rounded-md bg-white border border-[#cbdce4] px-2.5 py-1 font-mono font-bold text-[#087f72]">
                    {activeDeviceView.toUpperCase()} {activeDeviceView === 'desktop' ? '(1440px)' : activeDeviceView === 'tablet' ? '(768-900px)' : activeDeviceView === 'mobile' ? '(≤680px)' : '(Responsiivinen ikkuna)'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#677c8d]">
                  <CheckCircle2 className="h-4 w-4 text-[#0d9d8c]" />
                  <span>Kaikki 8 pistettä & suositukset integroitu koko sivustolle</span>
                </div>
              </div>

              {/* Responsive Type Hierarchy Comparison Grid */}
              <div className="rounded-xl border border-[#e2e9ee] bg-white overflow-hidden shadow-xs">
                <div className="border-b border-[#e2e9ee] bg-[#f5f8fa] px-4 py-3 font-[750] text-xs text-[#526a7d] uppercase tracking-wider">
                  Responsiivinen typografiahierarkia: Desktop vs Tablet vs Mobiili
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-[#e2e9ee] bg-[#fbfcfd] text-[11px] font-bold text-[#677c8d] uppercase">
                      <tr>
                        <th className="px-4 py-3">Typografiaelementti</th>
                        <th className="px-4 py-3">Desktop (&gt;1024px)</th>
                        <th className="px-4 py-3">Tablet (681-1024px)</th>
                        <th className="px-4 py-3">Mobiili (≤680px)</th>
                        <th className="px-4 py-3">Paino & Välistys</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef3f6]">
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Homepage Hero H1</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">52 - 62.4 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">38 - 48 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">32 - 36 px</td>
                        <td className="px-4 py-3 text-[#677c8d]">820; lh 1.07; tracking -0.045em</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Sivun otsikko H1 (Inner)</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">44 - 48 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">34 - 40 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">30 - 32 px</td>
                        <td className="px-4 py-3 text-[#677c8d]">820; lh 1.2; tracking -0.045em</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Osio-otsikko H2</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">28 - 32 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">24 - 26 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">22 px (kiinteä)</td>
                        <td className="px-4 py-3 text-[#677c8d]">780; lh 1.22; tracking -0.04em</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Kortti / Alaluokka H3</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">18 - 20 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">17.5 - 19 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#087f72]">17 - 18 px</td>
                        <td className="px-4 py-3 text-[#677c8d]">760; lh 1.25; tracking -0.025em</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc] bg-[#eef8f5]/40">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Perusteksti (Body)</td>
                        <td className="px-4 py-3 font-mono font-bold text-[#10263d]">16 px (lh 1.625)</td>
                        <td className="px-4 py-3 font-mono font-bold text-[#10263d]">15.5 px (lh 1.6)</td>
                        <td className="px-4 py-3 font-mono font-bold text-[#10263d]">15 px (lh 1.58)</td>
                        <td className="px-4 py-3 text-[#087f72] font-medium">Inter 400/500 (Upgrade S08)</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Selitysteksti & Korttikuvaus</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#2c4960]">14.5 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#2c4960]">14 px</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#2c4960]">13.5 - 14 px</td>
                        <td className="px-4 py-3 text-[#087f72] font-medium">Nostettu 11px -&gt; 14px!</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Painikkeet (Buttons)</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#ff8d43]">14 - 15 px (h≥46px)</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#ff8d43]">14 px (h≥45px)</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#ff8d43]">14 px (h≥45px)</td>
                        <td className="px-4 py-3 text-[#677c8d]">750; kosketustarkkuus ≥44px</td>
                      </tr>
                      <tr className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#142c42]">Hinnat & Metriikat</td>
                        <td className="px-4 py-3 font-mono font-bold text-[#ff8d43]">25 - 40 px</td>
                        <td className="px-4 py-3 font-mono font-bold text-[#ff8d43]">24 - 34 px</td>
                        <td className="px-4 py-3 font-mono font-bold text-[#ff8d43]">21 - 29 px</td>
                        <td className="px-4 py-3 text-[#677c8d]">JetBrains Mono; tabular-nums</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Three Device Cards Preview */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-[#cbdce4] bg-[#f8fafc] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#10263d]">
                    <Monitor className="h-4 w-4 text-[#0d9d8c]" />
                    <span>Desktop (Widescreen 1440px)</span>
                  </div>
                  <p className="text-xs text-[#526a7d] leading-relaxed">
                    Täysi sivupalkki (252px), leveä 4-sarakkeen palveluruudukko, 62px Hero-otsikko ja ilmava 16px leipäteksti 1.625 rivinvälillä.
                  </p>
                  <button
                    onClick={() => onChangeDeviceView('desktop')}
                    className="w-full rounded-lg bg-white border border-[#cbdce4] py-1.5 text-xs font-bold text-[#10263d] hover:bg-[#eef3f6]"
                  >
                    Valitse Desktop-katselu
                  </button>
                </div>

                <div className="rounded-xl border border-[#cbdce4] bg-[#f8fafc] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#10263d]">
                    <Tablet className="h-4 w-4 text-[#0d9d8c]" />
                    <span>Tablet (Pysty & Vaaka 768-900px)</span>
                  </div>
                  <p className="text-xs text-[#526a7d] leading-relaxed">
                    900px saranoitu taitto, 2-sarakkeen palvelu- ja hintakortit, automaattisesti skaalautuvat 38-48px otsikot ja 45px kosketusvyöhykkeet.
                  </p>
                  <button
                    onClick={() => onChangeDeviceView('tablet')}
                    className="w-full rounded-lg bg-white border border-[#cbdce4] py-1.5 text-xs font-bold text-[#10263d] hover:bg-[#eef3f6]"
                  >
                    Valitse Tablet-katselu
                  </button>
                </div>

                <div className="rounded-xl border border-[#cbdce4] bg-[#f8fafc] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#10263d]">
                    <Smartphone className="h-4 w-4 text-[#0d9d8c]" />
                    <span>Mobiili (Puhelimet ≤680px)</span>
                  </div>
                  <p className="text-xs text-[#526a7d] leading-relaxed">
                    Puhdas drawer-valikko, kiinteä 22px H2-katto, 21px hintanumerot, 15px luettava leipäteksti ja helppo peukalonavigointi.
                  </p>
                  <button
                    onClick={() => onChangeDeviceView('mobile')}
                    className="w-full rounded-lg bg-white border border-[#cbdce4] py-1.5 text-xs font-bold text-[#10263d] hover:bg-[#eef3f6]"
                  >
                    Valitse Mobiili-katselu
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === '8points' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#0d9d8c]/30 bg-[#eef7f5] p-4 text-xs text-[#087f72] flex items-start gap-2.5">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  Alla on suoraan virallisesta <strong>Siisti360 8-Point Guide (PDF)</strong> -dokumentista toteutetut 8 osiota ja niiden tarkat tekniset arvot, jotka ohjaavat kaikkia sivuston 333 sivua ja 3 kieltä (FI, SV, EN).
                </p>
              </div>

              {/* Point 1 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 01 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">01. Päivitetty ensisijainen fonttiperhe (Inter)</h4>
                <p className="text-xs text-[#526a7d]">
                  Ensisijainen: <code className="bg-[#f0f4f7] px-1.5 py-0.5 rounded font-mono">Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif</code>. Form controls inherit typography. Leipäteksti 16px (desktop) / 15px (mobile) rivivälillä 1.625.
                </p>
              </div>

              {/* Point 2 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 02 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">02. Responsiivinen otsikkoskaala (Heading Sizes)</h4>
                <p className="text-xs text-[#526a7d]">
                  Global H1: clamp(34.4px - 54.4px, weight 820, lh 1.15, tracking -0.045em). Homepage Hero H1: clamp(32px - 62.4px, lh 1.07). Global H2: clamp(22.4px - 32px, weight 780, lh 1.22). Global H3: 17.92px - 20px, weight 760.
                </p>
              </div>

              {/* Point 3 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 03 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">03. Navigaatio, logo ja painikkeet</h4>
                <p className="text-xs text-[#526a7d]">
                  Wordmark 27px (900 paino). Navigaatiolinkit 14-15px (600 paino). Section label 10.5px (750 paino). Painikkeet 14-15px (750 paino) vähintään 45px korkealla osuma-alueella.
                </p>
              </div>

              {/* Point 4 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 04 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">04. Sisältöosiot ja luettavuuskorjaus</h4>
                <p className="text-xs text-[#526a7d]">
                  Korttien kuvaukset, UKK-vastaukset, oppaiden leipätekstit ja footer-linkit korotettu aiemmasta 11-12px koosta luettavaan 14-15px kokoon, mikä varmistaa esteettömyyden ja parantaa konversiota.
                </p>
              </div>

              {/* Point 5 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 05 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">05. Hinnoittelu, laskuri, varaus ja suositukset</h4>
                <p className="text-xs text-[#526a7d]">
                  Hintakorttien otsikot 19px, hintanumerot 25px (820 paino, mobiilissa 21px), laskurin pääarvio 29-32px, varaussivun kenttäotsikot 13.5-14px (720 paino) ja tabular-nums numeraalitasapaino.
                </p>
              </div>

              {/* Point 6 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 06 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">06. Responsiiviset taitepisteet (Breakpoints)</h4>
                <p className="text-xs text-[#526a7d]">
                  1400px (3-4 sarake), 1170px (kompakti desktop), 900px (tablettitaitto, H1 skaalaus 33.6-48px), 700px (hinnat 21px), 680px (mobiili leipäteksti 15px &amp; drawer), 420px &amp; 385px (yksisarakkeiset kortit &amp; tiivis murupolku).
                </p>
              </div>

              {/* Point 7 */}
              <div className="rounded-xl border border-[#e2e9ee] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0d9d8c] font-mono">SECTION 07 / 08</span>
                  <span className="rounded bg-[#e5f6f1] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">TOTEUTETTU</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">07. Brändin virallinen väripaletti</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
                  <div className="rounded-lg p-2 bg-[#10263d] text-white">#10263D Primary Navy</div>
                  <div className="rounded-lg p-2 bg-[#183c56] text-white">#183C56 Sec Navy</div>
                  <div className="rounded-lg p-2 bg-[#ff8d43] text-[#10263d] font-bold">#FF8D43 Orange</div>
                  <div className="rounded-lg p-2 bg-[#0d9d8c] text-white font-bold">#0D9D8C Teal</div>
                  <div className="rounded-lg p-2 bg-[#f5f8fa] border border-[#cbdce4] text-[#142c42]">#F5F8FA Background</div>
                </div>
              </div>

              {/* Point 8 */}
              <div className="rounded-xl border border-[#0d9d8c] bg-[#eef7f5] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#087f72] font-mono">SECTION 08 / 08</span>
                  <span className="rounded bg-[#0d9d8c] text-white px-2 py-0.5 text-[10px] font-bold">AKTIIVINEN KAIKILLA SIVUILLA</span>
                </div>
                <h4 className="text-base font-bold text-[#10263d]">08. Suositellut typografiaparannukset</h4>
                <p className="text-xs text-[#1e584f]">
                  Kaikki suositukset on viety tuotantokoodiin: Inter ladataan varmennetusti, pienet selitetekstit nostettu 14px tasolle, kosketusalueet vähintään 45px ja kieliversiot (FI, SV, EN) testattu linjojen ja tavutuksen osalta.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tester' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#10263d]">Kokeile omaa tekstiä eri typografialuokilla:</label>
                <input
                  type="text"
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="w-full rounded-xl border border-[#cbdce4] px-3.5 py-2 text-sm text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                  placeholder="Kirjoita testilause..."
                />
              </div>

              {/* Interactive preview samples */}
              <div className="space-y-4 rounded-xl border border-[#e2e9ee] bg-[#f8fafc] p-5">
                <div>
                  <span className="text-[10.5px] font-[850] text-[#0d9d8c] uppercase tracking-[1.55px]">
                    Hero H1 (clamp 32px – 62.4px, 820 weight)
                  </span>
                  <div className="mt-1 hero-h1 text-[#10263d]">{testText}</div>
                </div>

                <div className="border-t border-[#e2e9ee] pt-4">
                  <span className="text-[10.5px] font-[850] text-[#0d9d8c] uppercase tracking-[1.55px]">
                    Section H2 (clamp 22.4px – 32px, 780 weight)
                  </span>
                  <div className="mt-1 heading-h2 text-[#10263d]">{testText}</div>
                </div>

                <div className="border-t border-[#e2e9ee] pt-4">
                  <span className="text-[10.5px] font-[850] text-[#0d9d8c] uppercase tracking-[1.55px]">
                    Card H3 (clamp 17.9px – 20px, 760 weight)
                  </span>
                  <div className="mt-1 heading-h3 text-[#10263d]">{testText}</div>
                </div>

                <div className="border-t border-[#e2e9ee] pt-4">
                  <span className="text-[10.5px] font-[850] text-[#0d9d8c] uppercase tracking-[1.55px]">
                    Body Text (16px desktop / 15px mobile, 1.625 line-height)
                  </span>
                  <p className="mt-1 type-body text-[#142c42]">{testText}. Luotettavat siivoojat, 60% kotitalousvähennys ja 100% tyytyväisyystakuu pääkaupunkiseudulla.</p>
                </div>

                <div className="border-t border-[#e2e9ee] pt-4">
                  <span className="text-[10.5px] font-[850] text-[#0d9d8c] uppercase tracking-[1.55px]">
                    Price / Numbers (JetBrains Mono, tabular-nums)
                  </span>
                  <div className="mt-1 font-mono-numbers text-2xl font-bold text-[#ff8d43]">
                    39,90 € / h · 145,00 € arvio · ★ 4.9/5
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between border-t border-[#e2e9ee] bg-[#f8fafc] px-6 py-3.5 gap-2">
          <div className="flex items-center gap-2 text-xs text-[#677c8d]">
            <span>Lähde:</span>
            <span className="font-semibold text-[#10263d]">Siisti360_All_8_Typography_Points_9b426a59.pdf</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#10263d] px-5 py-2 text-xs font-[750] text-white hover:bg-[#1b3d5c] transition-colors"
          >
            Sulje paneeli
          </button>
        </div>
      </div>
    </div>
  );
};
