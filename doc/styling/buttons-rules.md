# Buttons Rules

Currently in ASAB-WebUI based application we've arranged new design rules for buttons.

1. Don't add any icons to button if it contains another text. You can add it only if it's the only content of the button:

Correct:
```jsx
<Button> Text </Button>
<Button> <i className="cil-list" /> </Button>
```

Wrong: 
```jsx
<Button>
	<i className="cil-list" />
	Text
</Button>
```

2. All primary action buttons should have `primary` color and shouldn't be outlined.

Correct:
```jsx
<Button color="primary"> I'm a primary action button </Button>
```

Wrong:
```jsx
<Button color="primary" outline> I'm a primary action button </Button>
<Button color="success"> I'm a primary action button </Button>
```

3. All secondary action buttons should have `primary` color and should be outlined.

Correct:
```jsx
<Button color="primary" outline> I'm a secondary action button </Button>
```


Wrong:
```jsx
<Button color="primary"> I'm a secondary action button </Button>
<Button color="secondary"> I'm a secondary action button </Button>
```

4. All remove or delete buttons should have `danger` color. It can be outlined (depends on the context).

Correct:
```jsx
<Button color="danger"> I'm a remove action button </Button>
<Button color="danger" outline> I'm a remove action button </Button>
```


Wrong:
```jsx
<Button color="primary"> I'm a remove action button </Button>
<Button color="primary" outline> I'm a remove action button </Button>
<Button color="secondary"> I'm a remove action button </Button>
```