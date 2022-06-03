---
group: extension-best-practices
title: Code inspection
functional_areas:
  - Standards
---

### Web API XML service tag attributes inspections

![](../../_images/best-practices/phpstorm/service-tag-inspections-min.gif)

### DI XML preference tag attributes inspections

![](../../_images/best-practices/phpstorm/preference-tag-inspections-min.gif)

### DI XML type tag attributes inspections that related to the PHP/Magento types

The `Type` tag inspections (in the di.xml files) detect empty values or invalid values where a Type values (class, interface, virtual type) are expected.

![](../../_images/best-practices/phpstorm/type-tag-inspections-1-min.gif)

It also supports recursive inspection for `xsi:type="array"` arguments.

![](../../_images/best-practices/phpstorm/type-tag-inspections-2-min.gif)

### DI XML plugin type attribute inspections

![](../../_images/best-practices/phpstorm/plugin-tag-inspections-min.gif)
