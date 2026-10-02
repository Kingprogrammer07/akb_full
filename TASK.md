# Objective

Fix client edit form validation so existing AKB client codes with hyphens remain valid.

# Implementation Plan

- [x] Allow `-` in the client code Zod validation.
- [x] Preserve `-` while normalizing client code input.
- [x] Run targeted validation checks and a frontend build.

# Walkthrough / Architecture

`ClientForm` powers both `/client/add` and `/client/edit/:id`. The backend accepts and stores hyphenated AKB codes such as `A12-4`, but the frontend schema and input normalizer currently reject or strip `-`, causing valid existing client codes to appear invalid in edit mode.
