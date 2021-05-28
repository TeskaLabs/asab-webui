# Styling DataTable

`DataTable` children has it's own classnames. Check them with developer tools and if you want to style something, you may also use CSS selectors and combinators. Just create css file with your stylings and import it into container where you have `DataTable` component.

Example of styling every cell in third column: 
```
td:nth-child(3n) {
    font-family: monospace;
}
```

Example of styling with classname: 
```
.data-table-datetime {
    font-weight: 1000;
}
```