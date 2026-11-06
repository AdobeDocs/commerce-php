<InlineAlert variant="warning" slots="text"/>

Use POST or PUT requests for state-changing operations, such as adding a product to a shopping cart or wishlist. GET and HEAD requests can be served from the Adobe Commerce page cache, so do not use them to change state. For more information about HTTP cache behavior, see [RFC 9111, Section 3](https://www.rfc-editor.org/rfc/rfc9111.html#section-3).
