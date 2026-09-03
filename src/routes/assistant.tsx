import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User as UserIcon, FileBadge } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { answer, type AssistantResponse } from "@/lib/assistant-brain";
import { properties } from "@/lib/mock-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — TerraTrust AI" }] }),
  component: AssistantPage,
});

type Msg =
  | { role: "user"; text: string }
  | { role: "assistant"; reply: AssistantResponse };

const seed: Msg[] = [
  { role: "assistant", reply: {
    text: `Hi Amara — I'm **Terra**, your property assistant. I'm grounded in the same engines as your passport: confidence, fraud, valuation, intel. Try a question, or pick a property below.`,
    suggestions: [
      "What's the trust score on my Lekki property?",
      "Any fraud signals on my portfolio?",
      "What documents am I missing for Kaduna farmland?",
      "Estimate the value of my Abuja plot",
    ],
  } },
];

const examplePrompts = [
  "Why is my Kaduna farmland confidence below 80?",
  "Walk me through the next step for the Abuja plot",
  "Any encumbrances on Lekki Phase 1?",
  "How was the AI valuation calculated for Bodija?",
];

function AssistantPage() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const send = (t: string) => {
    const text = t.trim();
    if (!text || busy) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);
    // small simulated latency to feel grounded, not instant
    setTimeout(() => {
      const reply = answer(text);
      setMsgs(m => [...m, { role: "assistant", reply }]);
      setBusy(false);
    }, 380);
  };

  return (
    <AppShell title="AI Assistant" subtitle="Context-aware property intelligence — grounded in your real passport data.">
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="surface-card flex h-[72vh] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="h-4 w-4" /></div>}
                <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {m.role === "user" ? (
                    <p>{m.text}</p>
                  ) : (
                    <>
                      <div className="prose prose-sm max-w-none [&_p]:my-1 [&_strong]:text-foreground">
                        <ReactMarkdown>{m.reply.text}</ReactMarkdown>
                      </div>
                      {m.reply.citations && m.reply.citations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.reply.citations.map((c, k) => (
                            <span key={k} className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border">
                              <FileBadge className="h-3 w-3" />{c.label}{c.passportId ? ` · ${c.passportId}` : ""}
                            </span>
                          ))}
                        </div>
                      )}
                      {m.reply.suggestions && m.reply.suggestions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.reply.suggestions.map(s => (
                            <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-background">
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {m.role === "user" && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background"><UserIcon className="h-4 w-4" /></div>}
              </div>
            ))}
            {busy && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Bot className="h-4 w-4" /></div>
                <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t border-border p-3">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about a property, score, or document…" className="h-11" />
              <Button type="submit" disabled={busy || !input.trim()} className="h-11"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="surface-card p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><Sparkles className="h-3 w-3" /> Try asking</p>
            <div className="mt-3 flex flex-col gap-2">
              {examplePrompts.map(p => (
                <button key={p} onClick={() => send(p)} className="rounded-lg border border-border bg-surface px-3 py-2 text-left text-xs hover:bg-muted">{p}</button>
              ))}
            </div>
          </div>
          <div className="surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connected properties</p>
            <ul className="mt-2 space-y-1.5">
              {properties.map(p => (
                <li key={p.id}>
                  <button onClick={() => send(`Summarize ${p.title}`)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted">
                    <span className="truncate">{p.title}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{p.passportId}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-4 text-[11px] text-muted-foreground">
            Model: TerraTrust Geo-LLM v2.1 · Grounded in 4 properties, 12 documents, 2 disputes.
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
