import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, X, RefreshCw, Copy, Check, Eye, HelpCircle } from "lucide-react";
import { SiteData, initialSiteData } from "../types";

interface CMSEditorProps {
  siteData: SiteData;
  onChange: (newData: SiteData) => void;
}

export default function CMSEditor({ siteData, onChange }: CMSEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "services" | "pricing" | "json">("text");
  const [copied, setCopied] = useState(false);

  const updateField = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = { ...siteData };
    
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onChange(newData);
  };

  const updateServiceField = (index: number, field: string, value: any) => {
    const newServices = [...siteData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    onChange({ ...siteData, services: newServices });
  };

  const updatePricingField = (index: number, field: string, value: any) => {
    const newPricing = [...siteData.pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    onChange({ ...siteData, pricing: newPricing });
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(siteData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to restore the original premium sample data? All live changes will be reset.")) {
      onChange(initialSiteData);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        id="cms-editor-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-neutral-900 text-gold-300 hover:text-white px-5 py-3 rounded-full shadow-2xl border border-gold-500/20 cursor-pointer transition-all duration-300 interactive-card"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
        <span className="font-sans text-[10px] tracking-widest font-semibold uppercase">CMS Studio</span>
      </motion.button>

      {/* Floating Info Banner explaining live editing */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full shadow border border-neutral-200/50 text-neutral-600 text-[11px] font-sans">
        <HelpCircle className="w-4 h-4 text-gold-500" />
        <span>Click <b>CMS Studio</b> in bottom-right to customize any text or price!</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Sidebar Editor Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-950 text-neutral-200 shadow-2xl z-50 flex flex-col border-l border-neutral-800"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold tracking-wide text-gold-300">AURA CMS Studio</h3>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">Live customization playground</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="px-5 py-2.5 bg-neutral-900 border-b border-neutral-800 flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-red-400 text-[11px] font-sans font-medium transition-colors cursor-pointer mr-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default Data</span>
                </button>

                <button
                  onClick={handleCopyJSON}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-gold-300 text-[11px] font-sans font-medium transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied JSON!" : "Copy Full JSON"}</span>
                </button>
              </div>

              {/* Navigation Tabs inside the Editor */}
              <div className="flex bg-neutral-900/50 border-b border-neutral-800 text-xs font-sans">
                <button
                  onClick={() => setActiveTab("text")}
                  className={`flex-1 py-3 text-center border-b-2 font-medium transition-all cursor-pointer ${
                    activeTab === "text"
                      ? "border-gold-500 text-gold-300 bg-neutral-900"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  General & Hero
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`flex-1 py-3 text-center border-b-2 font-medium transition-all cursor-pointer ${
                    activeTab === "services"
                      ? "border-gold-500 text-gold-300 bg-neutral-900"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab("pricing")}
                  className={`flex-1 py-3 text-center border-b-2 font-medium transition-all cursor-pointer ${
                    activeTab === "pricing"
                      ? "border-gold-500 text-gold-300 bg-neutral-900"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab("json")}
                  className={`flex-1 py-3 text-center border-b-2 font-medium transition-all cursor-pointer ${
                    activeTab === "json"
                      ? "border-gold-500 text-gold-300 bg-neutral-900"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Raw JSON
                </button>
              </div>

              {/* Content Panels */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 font-sans text-xs">
                {activeTab === "text" && (
                  <div className="space-y-4">
                    {/* Brand Info */}
                    <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-3">
                      <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-[10px]">Brand Identity</h4>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Site Name</label>
                        <input
                          type="text"
                          value={siteData.siteName}
                          onChange={(e) => updateField("siteName", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Logo Brand Text</label>
                        <input
                          type="text"
                          value={siteData.logo}
                          onChange={(e) => updateField("logo", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Hero Editorial Texts */}
                    <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-3">
                      <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-[10px]">Hero Section</h4>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Hero Subtitle</label>
                        <input
                          type="text"
                          value={siteData.heroSubtitle}
                          onChange={(e) => updateField("heroSubtitle", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Hero Display Title</label>
                        <input
                          type="text"
                          value={siteData.heroTitle}
                          onChange={(e) => updateField("heroTitle", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Hero Description</label>
                        <textarea
                          rows={3}
                          value={siteData.heroDescription}
                          onChange={(e) => updateField("heroDescription", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* About Us section */}
                    <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-3">
                      <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-[10px]">About Section</h4>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">About Header Title</label>
                        <input
                          type="text"
                          value={siteData.aboutTitle}
                          onChange={(e) => updateField("aboutTitle", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">About Description Text</label>
                        <textarea
                          rows={4}
                          value={siteData.aboutDescription}
                          onChange={(e) => updateField("aboutDescription", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-3">
                      <h4 className="font-semibold text-gold-400 uppercase tracking-widest text-[10px]">Contact Details</h4>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Address Location</label>
                        <input
                          type="text"
                          value={siteData.contact.address}
                          onChange={(e) => updateField("contact.address", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Phone Contact</label>
                        <input
                          type="text"
                          value={siteData.contact.phone}
                          onChange={(e) => updateField("contact.phone", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-neutral-400 uppercase">Email Address</label>
                        <input
                          type="text"
                          value={siteData.contact.email}
                          onChange={(e) => updateField("contact.email", e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="space-y-4">
                    <p className="text-[11px] text-neutral-400 mb-2">Edit prices, titles, or descriptions of services. The changes show instantly.</p>
                    {siteData.services.map((service, index) => (
                      <div key={service.id} className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                          <span className="font-semibold text-gold-400 text-[10px]">SERVICE #{index + 1} ({service.category})</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2 space-y-1">
                            <label className="text-[9px] text-neutral-400 uppercase">Name</label>
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) => updateServiceField(index, "name", e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-neutral-400 uppercase">Price</label>
                            <input
                              type="text"
                              value={service.price}
                              onChange={(e) => updateServiceField(index, "price", e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs text-center font-semibold text-gold-300"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-neutral-400 uppercase">Description Summary</label>
                          <textarea
                            rows={2}
                            value={service.description}
                            onChange={(e) => updateServiceField(index, "description", e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "pricing" && (
                  <div className="space-y-4">
                    <p className="text-[11px] text-neutral-400 mb-2">Configure membership levels, fees, and call-to-actions.</p>
                    {siteData.pricing.map((plan, index) => (
                      <div key={plan.id} className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                          <span className="font-semibold text-gold-400 text-[10px]">{plan.name.toUpperCase()}</span>
                          {plan.popular && <span className="bg-gold-500/20 text-gold-300 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold">POPULAR</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-neutral-400 uppercase">Plan Name</label>
                            <input
                              type="text"
                              value={plan.name}
                              onChange={(e) => updatePricingField(index, "name", e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-neutral-400 uppercase">Fee Rate</label>
                            <input
                              type="text"
                              value={plan.price}
                              onChange={(e) => updatePricingField(index, "price", e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs text-center font-bold text-gold-300"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-neutral-400 uppercase">Short Pitch</label>
                          <input
                            type="text"
                            value={plan.description}
                            onChange={(e) => updatePricingField(index, "description", e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-neutral-400 uppercase">Button Text</label>
                          <input
                            type="text"
                            value={plan.buttonText}
                            onChange={(e) => updatePricingField(index, "buttonText", e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-white outline-none text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "json" && (
                  <div className="h-full flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 uppercase">Source Code Configuration Object</span>
                    </div>
                    <textarea
                      readOnly
                      rows={22}
                      value={JSON.stringify(siteData, null, 2)}
                      className="w-full flex-1 bg-neutral-950 border border-neutral-800 rounded p-3 text-mono text-[10px] text-neutral-300 outline-none font-mono resize-none focus:border-gold-500"
                    />
                    <button
                      onClick={handleCopyJSON}
                      className="w-full bg-gold-600 hover:bg-gold-500 text-white font-sans font-semibold py-2 rounded text-xs transition-colors cursor-pointer"
                    >
                      {copied ? "Copied to Clipboard!" : "Copy Full Code Configuration"}
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400 font-sans">
                <span>Aura Craftsmanship Suite v1.0</span>
                <span className="text-gold-400 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Live Synced
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
