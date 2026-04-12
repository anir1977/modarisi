import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "maintenance.json");

export function getMaintenanceMode(): boolean {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed.maintenanceMode === "boolean"
      ? parsed.maintenanceMode
      : true;
  } catch {
    return true; // safe default: show coming soon
  }
}

export function setMaintenanceMode(value: boolean): void {
  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      CONFIG_PATH,
      JSON.stringify({ maintenanceMode: value }, null, 2),
      "utf-8"
    );
  } catch (err) {
    throw new Error(`Failed to write maintenance config: ${err}`);
  }
}
