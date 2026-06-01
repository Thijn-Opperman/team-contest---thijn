import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3001";
const results = [];
const consoleErrors = [];
const pageErrors = [];
const step = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => pageErrors.push(String(e)));

const menuBtn = () => page.getByRole("button", { name: /navigation/ });
const expanded = async () => (await menuBtn().getAttribute("aria-expanded")) === "true";

try {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForURL("**/team", { timeout: 8000 }).catch(() => {});
  step("Fresh visit -> /team", page.url().endsWith("/team"));

  // wait for spin
  const cont = page.getByRole("button", { name: "Continue", exact: true });
  const start = Date.now();
  while (Date.now() - start < 9000 && (await cont.isDisabled())) await wait(150);

  // Menu closed by default
  step("Menu collapsed by default", !(await expanded()));

  // Open menu
  await menuBtn().click();
  await wait(300);
  step("Menu expands on tap", await expanded());
  await page.screenshot({ path: "scripts/shot-menu-open.png" });

  // Navigate via menu -> Leaderboard
  await page.getByRole("menuitem", { name: "Leaderboard" }).click();
  await page.waitForURL("**/team/leaderboard", { timeout: 6000 }).catch(() => {});
  step("Menu link navigates (Leaderboard)", page.url().endsWith("/team/leaderboard"));
  await wait(200);
  step("Menu auto-closes after navigation", !(await expanded()));

  // Menu -> My team (welcome)
  await menuBtn().click();
  await wait(200);
  await page.getByRole("menuitem", { name: "My team" }).click();
  await page.waitForURL("**/team/welcome", { timeout: 6000 }).catch(() => {});
  step("Menu link navigates (My team)", page.url().endsWith("/team/welcome"));

  // Linear flow still works: Continue -> standings
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.waitForURL("**/team/standings", { timeout: 6000 }).catch(() => {});
  step("Linear flow Continue -> standings", page.url().endsWith("/team/standings"));

  // Backdrop closes menu
  await menuBtn().click();
  await wait(200);
  await page.getByRole("button", { name: "Close menu" }).click();
  await wait(200);
  step("Tap-away backdrop closes menu", !(await expanded()));

  // Menu -> Home
  await menuBtn().click();
  await wait(200);
  await page.getByRole("menuitem", { name: "Home" }).click();
  await page.waitForURL(BASE + "/", { timeout: 6000 }).catch(() => {});
  await wait(600);
  step("Menu link navigates Home (no redirect)", new URL(page.url()).pathname === "/");
} catch (err) {
  step("Unexpected exception", false, String(err));
}

console.log("\nConsole errors:", consoleErrors.length ? "\n" + consoleErrors.join("\n") : "(none)");
console.log("Page errors:", pageErrors.length ? "\n" + pageErrors.join("\n") : "(none)");
const failed = results.filter((r) => !r.ok).length;
console.log(`\nSUMMARY: ${results.length - failed}/${results.length} passed, ${consoleErrors.length} console errors, ${pageErrors.length} page errors`);
await browser.close();
process.exit(failed || pageErrors.length ? 1 : 0);
