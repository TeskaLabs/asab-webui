# DataTable localization

You may find a few hard-coded things in DataTable:
1) `No items` sentence in body when accepted list in DataTable is empty
2) `Showing item(s)` at footer of the DataTable
3) `Limit` also in footer when setLimit is passed into `DataTable`

You should make two steps to be able to translate it:

1) First you need to create appropriate translations for them in your localizations files. All of them has same keys for translation as their fallbacks which you see. 
The only thing you also need to know is that `Showing item(s)` supports interpolation. So you should add `length` and `count` into your value of `Showing item(s)`.

Example of your translation file: 

```
{
    ...
    "Showing item(s)": "Showing {{ length }} of {{ count }} item(s)",
    "No items": "There are no items in here",
    "Limit": "There is no limits",
    ...
}

```

2) If you use some translation route, you should pass `translationRoute` into `DataTable` as props.

Example:

Your translation file:
```
"FancyContainer": {
    ...
    "Showing item(s)": "Showing {{ length }} of {{ count }} item(s)",
    "No items": "There are no items in here",
    "Limit": "There is no limits",
    ...
}
```

Your DataTable:
```
<DataTable
    ...
    translationRoute="FancyContainer"
    ...
/>
```

That's basically it. Now your `DataTable` is translated.