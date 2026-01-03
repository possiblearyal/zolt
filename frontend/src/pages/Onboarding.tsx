import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAbc } from "react-icons/md";
import ProfileImageUpload from "@/components/shared/ProfileImageUpload";
import InputField from "@/components/shared/InputField";
import type { OrgProfile, OrgRecord } from "@/types/org";
import { SectionBanner } from "@/components/shared/SectionBanner";

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8"
        style={{ color: "rgb(var(--color-text-primary))" }}
      >
        <SectionBanner
          title="Organization Setup"
          description="Add your organization details to personalize the experience. You
              can update these later in Settings."
          action={
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
                style={{
                  backgroundColor:
                    "rgb(var(--color-primary-foreground, 255 255 255))",
                  color: "rgb(var(--color-primary))",
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
                className="px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
                style={{
                  backgroundColor:
                    "rgb(var(--color-primary-foreground, 255 255 255))",
                  color: "rgb(var(--color-primary))",
                }}
                disabled={isSaving || isLoading}
              >
                {isSaving ? "Saving..." : "Save and continue"}
              </button>
            </div>
          }
        />

        <section
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
        </section>
      </form>
    </>
  );
}
