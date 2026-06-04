"use client";

import { useState, useEffect } from "react";
import { Terminal, ShieldAlert, Key, RefreshCw, Layers, Calendar, Mail, FileText, ChevronRight, User } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true); // Start loading to check session on mount
  const [error, setError] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [source, setSource] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session");
        const data = await response.json();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          await fetchInquiries();
        }
      } catch (err) {
        console.error("Session verification failure:", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "") return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await response.json();

      if (response.status === 200 && data.success) {
        setIsAuthenticated(true);
        await fetchInquiries();
      } else {
        setError(data.error || "Authentication failed: Invalid passcode.");
      }
    } catch {
      setError("Critical network exception: API unreachable.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/contact/retrieve");
      const data = await response.json();

      if (response.status === 200 && data.success) {
        setInquiries(data.contacts || []);
        setSource(data.source || "Unknown");
      } else if (response.status === 401) {
        setIsAuthenticated(false);
        setError("Session expired. Please re-establish authentication.");
      } else {
        setError(data.error || "Failed to load corporate telemetry logs.");
      }
    } catch {
      setError("Critical network exception: API unreachable.");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchInquiries();
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(false);
        setPasscode("");
        setInquiries([]);
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error("Logout execution failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial loading state to prevent screen flickers while checking session
  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="flex flex-col items-center space-y-4">
          <span className="flex h-8 w-8 border-2 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400">Verifying secure credentials...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        {/* Ambient background grids */}
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-md rounded-2xl bg-slate-950/80 border border-slate-850 p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shadow-lg">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">DeployForge Admin Console</h1>
            <p className="text-xs text-slate-400 font-medium">Authentication required to read corporate telemetry logs.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="passcode" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Passcode</label>
              <div className="relative">
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin access passcode"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                />
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-400 bg-red-950/20 border border-red-900/40 p-3 rounded-lg text-center animate-shake">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Establish Secure Link"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard screen (Passcode correct)
  return (
    <div className="min-h-screen bg-[#030712] py-20 relative">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header telemetry console */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-brand-cyan font-mono">
              <Terminal className="h-4 w-4" />
              <span>deployforge-terminal: active_session</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Client Inquiries Database</h1>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-850 text-slate-400">
              Source: {source}
            </span>
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all disabled:opacity-50"
              title="Refresh Logs"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-950/40 hover:border-red-800 transition-all text-xs font-bold disabled:opacity-50 space-x-2"
              title="Terminate Secure Link"
            >
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 backdrop-blur-md">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Audited Leads</p>
            <p className="text-2xl font-black text-white mt-1">{inquiries.length} Inquiries</p>
          </div>
          <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 backdrop-blur-md">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Database Sync Integrity</p>
            <p className="text-2xl font-black text-brand-cyan mt-1">100.0% SECURE</p>
          </div>
          <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5 backdrop-blur-md">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Awaiting Callback SLAs</p>
            <p className="text-2xl font-black text-brand-violet mt-1">&lt; 48 SPRINT HRS</p>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel - Inquiries List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider px-1">Inquiries Queue</h2>
            
            {inquiries.length === 0 ? (
              <div className="rounded-2xl border border-slate-900 bg-slate-950/20 p-10 text-center text-slate-500 font-mono text-xs">
                No active contact requests logged in the database yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin pr-2">
                {inquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`w-full text-left p-4.5 rounded-xl border transition-all flex items-center justify-between group ${
                      selectedInquiry?.id === inquiry.id
                        ? "bg-brand-blue/10 border-brand-blue/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : "bg-slate-950/40 border-slate-900 hover:border-slate-800 hover:bg-slate-900/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
                        <span>ID: {inquiry.id}</span>
                        <span>&bull;</span>
                        <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">
                        {inquiry.name}
                      </h3>
                      <p className="text-[10px] font-bold text-brand-cyan/90 border-l border-brand-blue/30 pl-2">
                        {inquiry.projectType}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right panel - Telemetry Inspector details */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider px-1">Lead Telemetry Inspector</h2>

            {!selectedInquiry ? (
              <div className="rounded-2xl border border-slate-900 bg-slate-950/10 p-16 text-center text-slate-500 font-mono text-xs h-[300px] flex flex-col items-center justify-center space-y-3 border-dashed">
                <Terminal className="h-6 w-6 text-slate-800" />
                <p>Select an inquiry to analyze the request metadata and details.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-850 bg-slate-950/50 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                {/* Visual mesh */}
                <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-brand-blue/5 rounded-full blur-[40px] pointer-events-none" />

                <div className="space-y-2 border-b border-slate-900 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-brand-cyan uppercase tracking-wider">
                      <span>AUDIT LOG</span>
                      <span>&bull;</span>
                      <span>{selectedInquiry.id}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] font-mono text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-white">{selectedInquiry.name}</h3>
                </div>

                {/* Audit Fields metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-slate-900/40 border border-slate-850 p-4 space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <Mail className="h-3.5 w-3.5 text-brand-blue" />
                      <span>Email Client Address</span>
                    </div>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-xs font-bold text-slate-200 hover:text-brand-blue transition-colors underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>

                  <div className="rounded-lg bg-slate-900/40 border border-slate-850 p-4 space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <Layers className="h-3.5 w-3.5 text-brand-cyan" />
                      <span>Scope & Budget Allocation</span>
                    </div>
                    <p className="text-xs font-bold text-slate-200">
                      {selectedInquiry.projectType} &bull; <span className="text-brand-cyan">{selectedInquiry.budget}</span>
                    </p>
                  </div>
                </div>

                {/* Message Outline block */}
                <div className="rounded-lg bg-slate-950/60 border border-slate-900 p-5 space-y-3">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5 text-brand-violet" />
                    <span>Project Description Matrix</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Secure audit line */}
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono pt-2">
                  <User className="h-3.5 w-3.5 text-brand-blue" />
                  <span>Secured session logging under AES-256 protocols.</span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
