import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Avatar } from "@/components/ui/avatar";

export function ProfilePage() {
  const { settings } = useAppData();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  function changePassword() {
    if (!newPassword.trim()) return;
    setCurrentPassword("");
    setNewPassword("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Link to="/more" aria-label="Back to more" className="text-ink-secondary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <Avatar name={settings.profile.name} photoUrl={settings.profile.photoUrl} size={56} />
        <div>
          <p className="text-base font-semibold">{settings.profile.name}</p>
          <p className="text-sm text-ink-secondary">{settings.profile.role}</p>
        </div>
      </div>

      <div className="mb-6 divide-y divide-border rounded-lg border border-border bg-surface-2">
        <InfoRow label="Email" value={settings.profile.email} />
        <InfoRow label="Mobile" value={settings.profile.mobile} />
        <InfoRow label="Role" value={settings.profile.role} />
      </div>

      <p className="mb-2 text-sm font-semibold">Change password</p>
      {saved && (
        <p className="mb-3 rounded-lg bg-status-paid-bg px-3 py-2 text-sm font-medium text-status-paid">
          Password updated
        </p>
      )}
      <div className="mb-3 space-y-3">
        <Input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <Button variant="primary" className="mb-6 w-full" onClick={changePassword}>
        Update password
      </Button>

      <Button variant="outline" className="w-full text-status-overdue" onClick={() => setLogoutOpen(true)}>
        <LogOut className="h-4 w-4" />
        Logout
      </Button>

      <ConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Log out?"
        description="You'll need to sign in again to access the admin portal."
        confirmLabel="Logout"
        onConfirm={() => {
          setLogoutOpen(false);
          navigate("/");
        }}
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3">
      <span className="text-sm text-ink-secondary">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
