Centred modal with a 14px radius — the largest corner radius in the system.

```jsx
<Dialog open={open} title="Foglalás megerősítése" onClose={close}
  footer={<><Button variant="secondary" onClick={close}>Mégsem</Button><Button variant="accent">Elküldöm</Button></>}>
  <p>Július 10–13., 4 fő, Folyóparti szoba.</p>
</Dialog>
```

Enters with an 8px rise over 280ms. Never animate out with a bounce.
