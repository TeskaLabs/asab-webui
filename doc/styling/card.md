# Card

Card styles are done on top of bootstrap v4 card styles. In ASAB-WebUI we've implemented a few features that will allow you to place card titles and buttons easily without writting any additional CSS.

## CardHeader

`CardHeader` component now by default doesn't have border-bottom. But in case you want to add one, you can add a unique className `border-bottom` to your `CardHeader` component:

```jsx
<CardHeader className="border-bottom">...</CardHeader>
```

### CardHeader Title

Usually in ASAB-WebUI cards we add title and icon to it in `CardHeader` component. In order to use default ASAB-WebUI card header title styles just simply wrap icon and title into `div` with className `card-header-title`.

```jsx
<Card>
	<CardHeader>
		<div className="card-header-title">
			<i className="cil-list" />
			Title
		</div>
	</CardHeader>
</Card>
```

### CardHeader Buttons

Usually in ASAB-WebUI cards we add buttons and other interactive elements in card header to the right of the component.
In order to use default ASAB-WebUI card header button styles just simply add them inside of `CardHeader` after the `div.card-header-title`.

```jsx
<Card>
	<CardHeader>
		<div className="card-header-title">
			<i className="cil-list" />
			Title
		</div>
		<Button>Click</Button>
	</CardHeader>
</Card>
```

If you want to use more buttons or add some input text then wrap all interactive elements into `ButtonGroup` component.

```jsx
<Card>
	<CardHeader>
		<div className="card-header-title">
			<i className="cil-list" />
			Title
		</div>
		<ButtonGroup>
			<Button>Action 1</Button>
			<Button>Action 2</Button>
		</ButtonGroup>
	</CardHeader>
</Card>
```

## CardFooter

`CardFooter` component now by default doesn't have border-top. But in case you want to add one, you can add a unique className `border-top` to your `CardFooter` component:

```jsx
<CardFooter className="border-top">...</CardFooter>
```

If you want to add one button inside CardFooter you can simply put it into it:

```jsx
<CardFooter className="border-top">
	<Button>Action</Button>
</CardFooter>
```

If you want to add two or more buttons inside CardFooter you can simply put it into it:

```jsx
<CardFooter className="border-top">
	<ButtonGroup>
		<Button>Action</Button>
		<Button>Action</Button>
	</ButtonGroup>
</CardFooter>
```

If you wish to split footer to two parts, putting a set of actions to the left and a action to the right, use this:

```jsx
<CardFooter className="border-top">
	<ButtonGroup>
		<Button>Action</Button>
		<Button>Action</Button>
	</ButtonGroup>
	<div className="actions-right">
		<Button>Right Action</Button>
	</div>
</CardFooter>
```

If you wish to split footer to two parts, putting a set of actions to the left and a dropdown to the right, use this:

```jsx
<CardFooter className="border-top">
	<ButtonGroup>
		<Button>Action</Button>
		<Button>Action</Button>
	</ButtonGroup>
	<Dropdown>
		...
	</Dropdown>
</CardFooter>
```