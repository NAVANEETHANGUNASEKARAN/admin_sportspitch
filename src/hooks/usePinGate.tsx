import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useAppData } from "./useAppData";

// A single global PIN dialog, requested imperatively from anywhere in the
// app: requestPin(() => doTheCriticalThing()). Keeps every "critical
// action" (delete player, edit payment, change settings, change PIN)
// funnelled through one consistent, reusable authentication step instead
// of duplicating a PIN dialog per screen.

interface PinGateShape {
  requestPin: (onSuccess: () => void) => void;
}

const PinGateContext = createContext<PinGateShape | null>(null);

export function usePinGate() {
  const ctx = useContext(PinGateContext);
  if (!ctx) throw new Error("usePinGate must be used within PinGateProvider");
  return ctx;
}

export function PinGateProvider({ children }: { children: ReactNode }) {
  const { settings } = useAppData();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const requestPin = useCallback((onSuccess: () => void) => {
    setPendingAction(() => onSuccess);
    setValue("");
    setError(false);
    setOpen(true);
  }, []);

  function handleConfirm() {
    if (value === settings.adminPin) {
      setOpen(false);
      pendingAction?.();
      setPendingAction(null);
    } else {
      setError(true);
    }
  }

  function handleCancel() {
    setOpen(false);
    setPendingAction(null);
  }

  return (
    <PinGateContext.Provider value={{ requestPin }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xs rounded-2xl border border-border bg-surface-2 p-5">
            <p className="mb-1 text-base font-semibold">Admin authentication</p>
            <p className="mb-4 text-sm text-ink-secondary">Enter the admin PIN to continue.</p>
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              className="mb-1 h-12 w-full rounded-lg border border-border bg-surface-1 px-3 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-brand-400"
              maxLength={6}
            />
            {error && <p className="mb-2 text-xs font-medium text-status-overdue">Incorrect PIN</p>}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCancel}
                className="h-11 flex-1 rounded-lg border border-border text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="h-11 flex-1 rounded-lg bg-brand-500 text-sm font-medium text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </PinGateContext.Provider>
  );
}
