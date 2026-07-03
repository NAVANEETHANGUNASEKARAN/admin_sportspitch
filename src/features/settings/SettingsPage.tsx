import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { usePinGate } from "@/hooks/usePinGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const tabs = ["General", "Business", "Payments", "Security", "Notifications"] as const;
type Tab = (typeof tabs)[number];

export function SettingsPage() {
  const { settings, setSettings } = useAppData();
  const { requestPin } = usePinGate();
  const [tab, setTab] = useState<Tab>("General");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState(settings.general);
  const [business, setBusiness] = useState(settings.business);
  const [payment, setPayment] = useState(settings.payment);
  const [notifications, setNotifications] = useState(settings.notifications);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");

  function flashSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function saveGeneral() {
    requestPin(() => {
      setSettings((s) => ({ ...s, general }));
      flashSaved();
    });
  }
  function saveBusiness() {
    requestPin(() => {
      setSettings((s) => ({ ...s, business }));
      flashSaved();
    });
  }
  function savePayment() {
    requestPin(() => {
      setSettings((s) => ({ ...s, payment }));
      flashSaved();
    });
  }
  function saveNotifications() {
    requestPin(() => {
      setSettings((s) => ({ ...s, notifications }));
      flashSaved();
    });
  }
  function changePin() {
    setPinError("");
    if (newPin.length < 4) {
      setPinError("PIN must be at least 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      setPinError("PINs do not match.");
      return;
    }
    requestPin(() => {
      setSettings((s) => ({ ...s, adminPin: newPin }));
      setNewPin("");
      setConfirmPin("");
      flashSaved();
    });
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Link to="/more" aria-label="Back to more" className="text-ink-secondary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
              tab === t
                ? "border-brand-500 bg-brand-50 text-brand-600"
                : "border-border bg-surface-2 text-ink-secondary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {saved && (
        <p className="mb-3 rounded-lg bg-status-paid-bg px-3 py-2 text-sm font-medium text-status-paid">
          Settings updated
        </p>
      )}

      {tab === "General" && (
        <div className="space-y-4">
          <Field label="Turf name">
            <Input value={general.turfName} onChange={(e) => setGeneral({ ...general, turfName: e.target.value })} />
          </Field>
          <Field label="Contact number">
            <Input
              value={general.contactNumber}
              onChange={(e) => setGeneral({ ...general, contactNumber: e.target.value })}
            />
          </Field>
          <Field label="Address">
            <Textarea value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
          </Field>
          <Button variant="primary" className="w-full" onClick={saveGeneral}>
            Save general settings
          </Button>
        </div>
      )}

      {tab === "Business" && (
        <div className="space-y-4">
          <Field label="Working hours">
            <Input
              value={business.workingHours}
              onChange={(e) => setBusiness({ ...business, workingHours: e.target.value })}
            />
          </Field>
          <Field label="Booking rules">
            <Textarea
              value={business.bookingRules}
              onChange={(e) => setBusiness({ ...business, bookingRules: e.target.value })}
            />
          </Field>
          <Button variant="primary" className="w-full" onClick={saveBusiness}>
            Save business settings
          </Button>
        </div>
      )}

      {tab === "Payments" && (
        <div className="space-y-4">
          <Field label="UPI ID">
            <Input value={payment.upiId} onChange={(e) => setPayment({ ...payment, upiId: e.target.value })} />
          </Field>
          <Field label="Bank details">
            <Textarea
              value={payment.bankDetails}
              onChange={(e) => setPayment({ ...payment, bankDetails: e.target.value })}
            />
          </Field>
          <Button variant="primary" className="w-full" onClick={savePayment}>
            Save payment settings
          </Button>
        </div>
      )}

      {tab === "Security" && (
        <div className="space-y-4">
          <p className="text-sm text-ink-secondary">Default admin PIN is 0000. Change it below.</p>
          <Field label="New PIN">
            <Input type="password" inputMode="numeric" maxLength={6} value={newPin} onChange={(e) => setNewPin(e.target.value)} />
          </Field>
          <Field label="Confirm new PIN">
            <Input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
            />
          </Field>
          {pinError && <p className="text-xs font-medium text-status-overdue">{pinError}</p>}
          <Button variant="primary" className="w-full" onClick={changePin}>
            Change admin PIN
          </Button>
        </div>
      )}

      {tab === "Notifications" && (
        <div className="space-y-1">
          <ToggleRow
            label="WhatsApp"
            checked={notifications.whatsapp}
            onChange={(v) => setNotifications({ ...notifications, whatsapp: v })}
          />
          <ToggleRow
            label="Email"
            checked={notifications.email}
            onChange={(v) => setNotifications({ ...notifications, email: v })}
          />
          <ToggleRow
            label="Push notifications"
            checked={notifications.push}
            onChange={(v) => setNotifications({ ...notifications, push: v })}
          />
          <Button variant="primary" className="mt-4 w-full" onClick={saveNotifications}>
            Save notification settings
          </Button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-secondary">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface-2 p-3">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
