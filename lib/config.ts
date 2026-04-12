import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "maintenance.json");

export function getMaintenanceMode(): boolean {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw).maintenanceMode ?? true;
  } catch {
    return true; // safe default: show coming soon
  }
}

export function setMaintenanceMode(value: boolean): void {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    CONFIG_PATH,
    JSON.stringify({ maintenanceMode: value }, null, 2),
    "utf-8"
  );
}
