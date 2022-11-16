# In-stock group project - brainstation
**Group members:**
- [Cara](https://github.Com/sifatdipta/in-stock)
- [Akshay](https://github.Com/thornebanks)
- [Ryan](https://github.Com/rm-jordan)
- [Sifat](https://github.Com/sifatdipta)
- [Ehtasham](https://github.Com/emunib)

**Date started:** 15-11-2021

## Feature/warehouse-list
* added table system
* using routers for testing elements
* some scss bug fixes
* asset folder name typo
* warehouse list component for front end
* capitalized all components (was not consistent, please use pascal case)
* created pages folder for pages (use them to build pages using components, use component for creating reusable elements)

### Using the table component

The table component can be used just like the table tag on html

It takes in two props (**headeritems** and **listitems**) accepting jsx.

You would pass in a **p** tag with class **table__header-item** for each items in **headeritems**. To pass in the sort icon just place an img tag with class **table__header-icon** inside the p tag.

For creating a list group send a div with class **table__list** and a span with class **table__list-item** for all the items within.

**Example**
```
<Table
    headerItems={
        <>
            <p className="table__header-item">Name <img className="table__header-icon" src={SortIcon} alt="sort-icon" /></p>
            <p className="table__header-item">Age <img className="table__header-icon" src={SortIcon} alt="sort-icon" /></p>
            <p className="table__header-item table__header-item--action">Actions</p>
        </>
    }
    listItems={
        <>
            <div className="table__list" >
                <span className="table__list-item"><p className="body-medium yourcomponent__name">Sifat Dipta</p></span>
                <span className="table__list-item"><p className="body-medium yourcomponent__age">21</p></span>
                <span className="table__list-item table__list-item--actions"><ActionItems items={
                    <>
                        <span onClick={() => {alert("Test")}}><img className="" src={DeleteIcon} /></span>
                        <span><img className="" src={EditIcon} /></span>
                    </>
                } /></span>
            </div>
            <div className="table__list" >
                <span className="table__list-item"><p className="body-medium yourcomponent__name">Andrea</p></span>
                <span className="table__list-item"><p className="body-medium yourcomponent__age">18</p></span>
                <span className="table__list-item table__list-item--actions"><ActionItems items={
                    <>
                        <span onClick={() => {alert("Test")}}><img className="" src={DeleteIcon} /></span>
                        <span><img className="" src={EditIcon} /></span>
                    </>
                } /></span>
            </div>
        </>
    }
/>
```
To fully understand how to implement checkout [WarehouseList](client/src/pages/WarehouseList/WarehouseList.jsx) component.

Table is responsive and should work on all devices. For design changes on any list item, create a new element within the span and have the design be part page component.

To pass in action items, you will import **{ ActionItems }** from Table and can pass it in as the last item in the listItems prop. The span tag containing it must have **table__list-item--actions** added to its class list as extra. The header item must have the class **table__header-item--action** as extra. ActionsItems will assume they are clickable, hence cursor pointer set by default.

## Feature/footer

Added the footer component

## Feature/page-structure
* Header style fixes
* ListHeader changed to PageHeader as we will be using it on pages thats not a list
* PageHeader component structure change
* Main wrapper is now styled and responsive
* Footer bug fixed

### Using the PageHeader component
Pass in the title as a prop and rest of the elements ex buttons, search bar as children. You must asign all the design for the children on your parent component. That includes responive attribute of the element.

If you would like for it to include a back/previous button pass **goBack={this.props.history ? this.props.history : null}**!

**Example**
```
<PageHeader title="Warehouse" goBack={this.props.history ? this.props.history : null}>
    <SearchBar />
    <Button />
</PageHeader>
```

## Feature/custom-from
A reusable form component that will take care of all error handling!

### Using the form component
You would pass in all your inputs within **<CustomForm>** component just like you would do with a regualr form. Each form element requires you to have the class **custom-form__el** and a data-cansubmit attribute with a default value of false. 

You must pass in a onSubmitHandler with your custom function that can take in **e / event** as a pram that will allow you to work with the HTML form element. CustomForm already applies preventDefault by default.

**Example**
```
const yourFormHandlerFunction = (e) => {
    console.log(e); // HTML FORM
    //Do your axios calls...
}

<CustomForm onSubmitHandler={(e) => yourFormHandlerFunction(e)}>
    <input className="custom-form__el" type="email" placeholder="testt" data-cansubmit={false} />
    <input className="custom-form__el" type="text" placeholder="testt" data-cansubmit={false}/>
    <Button type="submit" btnType="primary" text="Submit Form" />
</CustomForm>
```

<!-- run= eval "$(ssh-agent -s)" -->
<!-- ssh-add ~/.Ssh/git-hub -->