import { useActiveIds } from "./useActiveIds";
import { siteConfig } from "../config/site";

/**
 * Seção ativa da home: ids derivados de `siteConfig.nav`
 * (zero hardcode de âncora). O Header usa pra acender o link.
 */
export function useActiveSection() {
    const ids = siteConfig.nav.map((item) => item.href.replace(/^#/, ""));
    const activeId = useActiveIds(ids);
    return activeId ? `#${activeId}` : null;
}
