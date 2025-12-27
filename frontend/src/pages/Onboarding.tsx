import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAbc } from "react-icons/md";
import ProfileImageUpload from "@/components/shared/ProfileImageUpload";
import InputField from "@/components/shared/InputField";
import type { OrgProfile, OrgRecord } from "@/types/org";

export default function Onboarding() {
  const [orgName, setOrgName] = useState("");
  const [masterPin, setMasterPin] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrg = async () => {
      try {
        const existing: OrgRecord | null | undefined =
          await window.orgApi?.getOrg?.();
        if (existing) {
          setOrgName(existing.name ?? "");
          setMasterPin(existing.masterPin ?? "");
          setImageUrl(existing.imageUrl ?? "");
        }
      } catch (err) {
        console.warn("Failed to load org from db", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadOrg();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) {
      toast.error("Organization name is required");
      return;
    }
    if (!masterPin.trim()) {
      toast.error("Master PIN is required");
      return;
    }
    const payload: OrgProfile = {
      name: orgName.trim(),
      masterPin: masterPin.trim(),
      imageUrl,
    };
    try {
      setIsSaving(true);
      if (!window.orgApi?.saveOrg) {
        toast.error("App bridge unavailable. Please restart the app.");
        return;
      }

      await window.orgApi.saveOrg(payload);
      toast.success("Onboarding saved to app");
      navigate("/");
    } catch (err) {
      toast.error("Failed to save organization to the app");
      console.warn(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <section
        className="flex flex-col gap-8"
        style={{ color: "rgb(var(--color-text-primary))" }}
      >
        <div
          className="py-8"
          style={{
            background:
              "linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-accent)) 100%)",
            color: "rgb(var(--color-primary-foreground, 255 255 255))",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Organization Setup</h1>
            <p style={{ opacity: 0.9 }}>
              Add your organization details to personalize the experience. You
              can update these later in Settings.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 rounded-2xl"
          style={{
            borderColor: "rgb(var(--color-border))",
          }}
        >
          {isLoading && (
            <p style={{ color: "rgb(var(--color-text-secondary))" }}>
              Loading organization...
            </p>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Organization name
            </label>
            <InputField
              name="orgName"
              placeholder="e.g., Everest School"
              value={orgName}
              onChange={(val) => setOrgName(val)}
              icon={<MdOutlineAbc />}
              inputClassName="px-3 py-2"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Master PIN</label>
            <InputField
              name="masterPin"
              type="password"
              placeholder="Enter a secure PIN"
              value={masterPin}
              onChange={(val) => setMasterPin(val)}
              icon={<RiLockPasswordLine />}
              inputClassName="px-3 py-2"
              disabled={isLoading}
            />
            <p
              className="text-xs"
              style={{ color: "rgb(var(--color-text-secondary))" }}
            >
              This PIN secures admin actions. Keep it safe.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Organization image
            </label>
            <ProfileImageUpload
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border cursor-pointer"
              style={{
                borderColor: "rgb(var(--color-border))",
                color: "rgb(var(--color-text-primary))",
                backgroundColor: "rgb(var(--color-bg-secondary))",
              }}
              onClick={() => {
                setOrgName("");
                setMasterPin("");
                setImageUrl("");
                toast.info("Cleared");
              }}
              disabled={isSaving}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg cursor-pointer"
              disabled={isSaving || isLoading}
              style={{
                backgroundColor: "rgb(var(--color-primary))",
                color: "rgb(var(--color-primary-foreground, 255 255 255))",
              }}
            >
              {isSaving ? "Saving..." : "Save and continue"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
