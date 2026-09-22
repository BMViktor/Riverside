Content container: white, 1px warm hairline, 8px radius, no shadow at rest.

```jsx
<Card interactive media={<div className="rv-photo" style={{ aspectRatio: '4/3' }} />}>
  <h3>Folyóparti szoba</h3>
</Card>
```

Elevation appears only on hover (`--shadow-md` + 2px lift) or for `raised`. Never combine a shadow with a visible border.
