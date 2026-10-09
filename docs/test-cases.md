# Toolshop Test Cases

## Purpose

This document contains the initial functional test scenarios identified during exploratory analysis of the Toolshop e-commerce application.

The objective is to identify:

- Critical business flows
- Positive scenarios
- Negative scenarios
- Edge cases
- Candidate automation tests
- Appropriate testing layers

---

# Priority Definitions

| Priority | Meaning |
|---|---|
| P0 | Critical business functionality. Failure blocks an essential user journey. |
| P1 | Important functionality but not necessarily application-blocking. |
| P2 | Useful validation with lower business impact. |

---

# Test Type Definitions

| Type | Meaning |
|---|---|
| UI | Best validated through the browser |
| API | More efficiently validated directly through the backend |
| UI + API | Requires UI behavior with API setup or backend verification |
| Manual | Better suited for exploratory/manual validation |

---

# 1. Registration

## TC-REG-001 — Register with valid customer information

**Priority:** P0  
**Type:** UI + API  
**Category:** Positive

### Preconditions

- User is not authenticated.
- Email address has not previously been registered.

### Steps

1. Open the registration page.
2. Enter valid first name.
3. Enter valid last name.
4. Enter valid date of birth.
5. Enter valid address.
6. Select a country.
7. Enter valid postal code.
8. Enter valid city.
9. Enter valid phone number.
10. Enter a unique email address.
11. Enter a valid password.
12. Submit the registration form.

### Expected Result

- Registration succeeds.
- The user account is created.
- No validation errors are displayed.

---

## TC-REG-002 — Register using an existing email

**Priority:** P1  
**Type:** API  
**Category:** Negative

### Preconditions

- An account already exists with the selected email.

### Steps

1. Open registration.
2. Complete all fields with valid information.
3. Enter an already registered email.
4. Submit.

### Expected Result

- Registration is rejected.
- An appropriate validation message is returned.

---

## TC-REG-003 — Submit registration with mandatory fields empty

**Priority:** P1  
**Type:** UI  
**Category:** Negative

### Steps

1. Open registration.
2. Leave required fields empty.
3. Submit the form.

### Expected Result

- Registration does not occur.
- Validation messages identify the required fields.

---

## TC-REG-004 — Register using boundary-length field values

**Priority:** P2  
**Type:** API  
**Category:** Boundary / Edge Case

### Examples

Test values around accepted limits:

- Minimum password length
- Maximum first-name length
- Maximum last-name length
- Maximum address length
- Maximum phone length

### Expected Result

- Values inside accepted boundaries succeed.
- Values outside accepted boundaries are rejected appropriately.

---

# 2. Login

## TC-AUTH-001 — Login using valid credentials

**Priority:** P0  
**Type:** UI  
**Category:** Positive

### Preconditions

- Valid customer account exists.

### Steps

1. Open login.
2. Enter valid email.
3. Enter valid password.
4. Submit.

### Expected Result

- Authentication succeeds.
- The user reaches an authenticated state.
- Account functionality becomes available.

---

## TC-AUTH-002 — Login using incorrect password

**Priority:** P0  
**Type:** UI  
**Category:** Negative

### Steps

1. Enter a registered email.
2. Enter an incorrect password.
3. Submit.

### Expected Result

- Login is rejected.
- User remains unauthenticated.
- Error feedback is displayed.

---

## TC-AUTH-003 — Login using unregistered email

**Priority:** P1  
**Type:** API  
**Category:** Negative

### Steps

1. Enter an email that does not belong to any account.
2. Enter a password.
3. Submit.

### Expected Result

- Authentication fails.
- No session/token is created.

---

## TC-AUTH-004 — Submit malformed email input

**Priority:** P2  
**Type:** UI  
**Category:** Edge Case

### Example

```text
invalid-email
```

### Expected Result

- Input validation prevents or rejects authentication.
- Appropriate validation feedback appears.

---

# 3. Products

## TC-PROD-001 — Display product catalog

**Priority:** P0  
**Type:** UI  
**Category:** Positive

### Steps

1. Open Toolshop.
2. Navigate to products if necessary.

### Expected Result

- Products load successfully.
- Product cards contain meaningful product information.

---

## TC-PROD-002 — Open product details

**Priority:** P0  
**Type:** UI  
**Category:** Positive

### Steps

1. Open the product catalog.
2. Select a product.

### Expected Result

- Product-detail information is displayed.
- The opened product corresponds to the selected product.

---

## TC-PROD-003 — Request a nonexistent product

**Priority:** P1  
**Type:** API  
**Category:** Negative

### Steps

1. Request a product ID that does not exist.

### Expected Result

- The API returns an appropriate not-found response.
- No unrelated product is returned.

---

## TC-PROD-004 — Verify incomplete or unusual product data

**Priority:** P2  
**Type:** UI + API  
**Category:** Edge Case

### Examples

Product with:

- Very long name
- Very long description
- Missing optional information
- Unusual price value

### Expected Result

- The application remains usable.
- Product presentation does not break the user flow.

---

# 4. Search

## TC-SEARCH-001 — Search using an existing product name

**Priority:** P0  
**Type:** UI  
**Category:** Positive

### Steps

1. Open Toolshop.
2. Enter the name or partial name of an existing product.
3. Perform the search.

### Expected Result

- Matching products are displayed.
- Results correspond to the search term.

---

## TC-SEARCH-002 — Search for a nonexistent product

**Priority:** P1  
**Type:** UI  
**Category:** Negative

### Steps

1. Enter a string that should not match any product.
2. Search.

### Expected Result

- No irrelevant products are returned.
- The user receives appropriate empty-state feedback.

---

## TC-SEARCH-003 — Search using only whitespace

**Priority:** P2  
**Type:** UI  
**Category:** Negative

### Example

```text
"     "
```

### Expected Result

The application handles the input gracefully without crashing or producing invalid results.

---

## TC-SEARCH-004 — Search with special characters

**Priority:** P2  
**Type:** UI / API  
**Category:** Edge Case

### Examples

```text
@
'
%
_
<script>
```

### Expected Result

- Application remains stable.
- Input is handled safely.
- Search behavior remains predictable.

---

# 5. Product Filters

## TC-FILTER-001 — Filter products by category

**Priority:** P1  
**Type:** UI  
**Category:** Positive

### Steps

1. Open products.
2. Select a product category.

### Expected Result

- Only products belonging to the selected category are displayed.

---

## TC-FILTER-002 — Apply multiple compatible filters

**Priority:** P1  
**Type:** UI  
**Category:** Positive

### Example

Apply:

- Category
- Brand

### Expected Result

Displayed products satisfy all active filters.

---

## TC-FILTER-003 — Apply filters producing no results

**Priority:** P2  
**Type:** UI  
**Category:** Negative

### Expected Result

- No unrelated products appear.
- An appropriate empty-result state is shown.

---

## TC-FILTER-004 — Combine filtering and searching

**Priority:** P1  
**Type:** UI  
**Category:** Edge / Integration

### Steps

1. Apply a category filter.
2. Enter a search term.

### Expected Result

Search results respect the active filters.

---

# 6. Shopping Cart

## TC-CART-001 — Add a product to cart

**Priority:** P0  
**Type:** UI  
**Category:** Positive

### Steps

1. Open a product.
2. Add it to the cart.
3. Open the cart.

### Expected Result

- The selected product appears in the cart.
- Product information is correct.

---

## TC-CART-002 — Remove a product from cart

**Priority:** P0  
**Type:** UI  
**Category:** Positive

### Preconditions

- Cart contains at least one product.

### Steps

1. Open the cart.
2. Remove the product.

### Expected Result

- Product disappears from the cart.
- Cart totals are recalculated.

---

## TC-CART-003 — Change product quantity

**Priority:** P1  
**Type:** UI + API  
**Category:** Positive

### Steps

1. Add a product.
2. Change its quantity.

### Expected Result

- Quantity is updated.
- Line total changes appropriately.
- Cart total is recalculated.

---

## TC-CART-004 — Attempt invalid quantity

**Priority:** P1  
**Type:** API  
**Category:** Edge / Negative

### Examples

```text
0
-1
extremely large quantity
```

### Expected Result

Invalid quantity values are rejected according to business rules.

---

# 7. Checkout

## TC-CHECKOUT-001 — Complete checkout with valid information

**Priority:** P0  
**Type:** UI + API  
**Category:** Positive

### Preconditions

- User is authenticated.
- Cart contains a valid product.

### Steps

1. Open cart.
2. Proceed to checkout.
3. Complete required checkout information.
4. Select a valid payment method.
5. Confirm the order.

### Expected Result

- Checkout succeeds.
- Order confirmation is displayed.
- Backend reflects the completed transaction.

---

## TC-CHECKOUT-002 — Attempt checkout with empty cart

**Priority:** P0  
**Type:** UI  
**Category:** Negative

### Steps

1. Ensure cart is empty.
2. Attempt to access checkout.

### Expected Result

User cannot complete a checkout without products.

---

## TC-CHECKOUT-003 — Attempt checkout while unauthenticated

**Priority:** P0  
**Type:** UI  
**Category:** Negative

### Preconditions

- User is logged out.
- Cart contains a product if anonymous carts are supported.

### Steps

1. Attempt to continue to checkout.

### Expected Result

The application requires authentication or otherwise follows the expected business rule.

---

## TC-CHECKOUT-004 — Submit invalid payment information

**Priority:** P1  
**Type:** UI + API  
**Category:** Edge / Negative

### Expected Result

- Transaction is rejected.
- Order is not incorrectly marked as completed.
- Appropriate feedback is shown.

---

# Initial Priority Summary

## P0 — Critical

- TC-REG-001
- TC-AUTH-001
- TC-AUTH-002
- TC-PROD-001
- TC-PROD-002
- TC-SEARCH-001
- TC-CART-001
- TC-CART-002
- TC-CHECKOUT-001
- TC-CHECKOUT-002
- TC-CHECKOUT-003

## P1 — Important

- TC-REG-002
- TC-REG-003
- TC-AUTH-003
- TC-PROD-003
- TC-SEARCH-002
- TC-FILTER-001
- TC-FILTER-002
- TC-FILTER-004
- TC-CART-003
- TC-CART-004
- TC-CHECKOUT-004

## P2 — Additional coverage

- TC-REG-004
- TC-AUTH-004
- TC-PROD-004
- TC-SEARCH-003
- TC-SEARCH-004
- TC-FILTER-003