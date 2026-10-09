# Objective

Show the partner flight mask on the warehouse page. Partner clients only know their masked flight name (for example `NAVO7` for the real flight `M200`), so warehouse staff need to see it next to the real name and be able to search by it.

# Implementation Plan

- [x] Add optional `flight_mask` to `FlightGroup`, `WarehouseTransactionItem` and `WarehouseActivityItem` in `src/api/services/warehouse.ts`.
- [x] Add `FlightMaskBadge`, which shows "Mijozda: {mask}" only when a mask exists and differs from the real name.
- [x] Render the badge next to the flight title in `GroupedTransactionsList` and next to the flight in `MyActivityList`.
- [x] Say in the flight filter placeholder that a mask can be typed too.
- [x] Run `npm run build` and lint the touched files.

# Walkthrough / Architecture

The backend (`akb_fbot`, `GET /warehouse/transactions/search-grouped`, `/my-activity`, `/transactions/search`, `/flight/{name}/transactions`) now returns `flight_mask` per client and flight, resolved from the client's partner and `partner_flight_aliases`. The field is optional here so the page keeps working against an older backend. The flight filter already sends whatever the worker types; the backend translates a mask to its real flight, so no request changes are needed. The real flight name stays the title and the key for selection, cashier notifications and bulk mark-taken.
