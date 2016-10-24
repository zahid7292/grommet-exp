/**
 * Created by razamd on 10/22/2016.
 */
import { NAV_ACTIVATE } from "./constants";

export function navActivate (active) {
  return { type: NAV_ACTIVATE, active: active};
}
