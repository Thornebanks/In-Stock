import './Table.scss';
import ReactDOM from 'react-dom';
import React, { createRef } from 'react';
import SortIcon from '../../assets/Icons/sort-24px.svg';

// Checking windowDimentions to make the component responsive
function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
        width
    };
}

// Component for handling Action Items
export function ActionItems ({items}) {
    return (
        <div className="table__actions">
            {items}
        </div>
    );
}

// Component for handling sorting
export class Sort extends React.Component {
    state = {
        direction: "b"
    }

    sortItems = (pos) => {
        const tableListItems = Array.from(ReactDOM.findDOMNode(window.TableComponent.tableList.current).getElementsByClassName('table__list'));

        tableListItems.sort((a, b) => {
            if (this.state.direction === "b") {
                this.setState({direction: "a"})
                return a.children[pos].innerText.toLowerCase().localeCompare(b.children[pos].innerText.toLowerCase());
            } else if (this.state.direction === "a") {
                this.setState({direction: "b"})
                return b.children[pos].innerText.toLowerCase().localeCompare(a.children[pos].innerText.toLowerCase());
            }

            return null;
        });

        window.TableComponent.tableList.current.innerHTML = "";
        tableListItems.forEach((item) => {
            window.TableComponent.tableList.current.appendChild(item);
        });
    }

    render () {
        return (
            <img className="table__header-sort" src={SortIcon} alt="sort-icon" onClick={() => this.sortItems(this.props.position)} />
        );
    }
}

//function Table ({headerItems, listItems}) {
class Table extends React.Component {
    tableHeader = createRef(); // Getting table header that's being passed in
    tableList = createRef(); // Getting list items being passed in
    widthSet = false;


    componentDidMount() {
        this.makeResponsive();
        this.handleWindowResize();
        window.TableComponent = this;
        window.addEventListener('resize', this.handleWindowResize); // To listen to window reasize
    }

    componentDidUpdate() {
        this.widthSet = false;
        this.makeResponsive();
        this.handleWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = () => {
        if(getWindowDimensions().width > 767) { 
            this.setAlignment("tablet");
        } else {
            this.setAlignment("mobile");
        }
    }

    // Setting Width Based On Dynamic Content
    setAlignment = (device) => {
        const tableHeaderItems = Array.from(ReactDOM.findDOMNode(this.tableHeader.current).getElementsByClassName('table__header-item'));
        const tableListItems = Array.from(ReactDOM.findDOMNode(this.tableList.current).getElementsByClassName('table__list'));

        if(device === "mobile") {
            tableListItems.forEach((listItem) => {
                const childrens = Array.from(ReactDOM.findDOMNode(listItem).getElementsByClassName('table__list-item-group'));
                childrens.forEach((child) => {
                    if(!child.classList.contains('table__list-item-group--actions')) {
                        child.classList.add('force-mobile');
                    }
                })
            })
            this.widthSet = false;
        } else if(device === "tablet" && !this.widthSet) {
            tableHeaderItems.forEach((item, i) => {
                let widestElement = {
                    width: null
                }
                
                // Getting The Widest
                const getWidestEl = () => {
                    if(item.offsetWidth >= widestElement.width) {
                        widestElement.width = item.offsetWidth;
                    }
        
                    tableListItems.forEach((listItem) => {
                        const childrens = Array.from(ReactDOM.findDOMNode(listItem).getElementsByClassName('table__list-item-group'));
                        childrens[i].classList.remove('force-mobile');
                        if(childrens[i].offsetWidth >= widestElement.width) {
                            widestElement.width = childrens[i].offsetWidth;
                        }
                    })
                }
    
                getWidestEl();
                
                // Set New Width
                item.style.width = (widestElement.width + 3) + "px";
                tableListItems.forEach((listItem) => {
                    const childrens = Array.from(ReactDOM.findDOMNode(listItem).getElementsByClassName('table__list-item-group'));
                    childrens[i].style.width = (widestElement.width + 3) + "px";
                })
            });
            this.widthSet = true;
        }
    }

    // Resoinsible for making each items responsive
    makeResponsive = () => {
        const tableListItems = Array.from(ReactDOM.findDOMNode(this.tableList.current).getElementsByClassName('table__list'));
        const tableHeaderItems = Array.from(ReactDOM.findDOMNode(this.tableHeader.current).getElementsByClassName('table__header-item'));

        tableListItems.forEach((listItem) => {
            const childrens = Array.from(ReactDOM.findDOMNode(listItem).getElementsByClassName('table__list-item'));
            childrens.forEach((child, i) => {
                const itemWrapper = document.createElement("div");
                itemWrapper.classList.add("table__list-item-group"); 
                listItem.replaceChild(itemWrapper, child);

                if(childrens[i].classList.contains('table__list-item--actions')) {
                    itemWrapper.classList.add("table__list-item-group--actions");
                }

                const itemlable = document.createElement("lable");
                itemlable.classList.add("table__list-lable");
                itemlable.innerHTML = tableHeaderItems[i].innerText;

                if(childrens[i].classList.contains('table__list-item--actions')) {
                    itemlable.classList.add("table__list-lable--actions");
                }

                itemWrapper.appendChild(itemlable);
                itemWrapper.appendChild(child);
            });
        })
    }

    render () {
        return(
            <div className="table">
                <div className="table__header" ref={this.tableHeader}>
                    {/* Each Items Must Have A Class Name Of table__header-item, Passing In An Sort Icon Is Optional*/}
                    {this.props.headerItems}
                </div>
                <div className="table__list-container" ref={this.tableList}>
                    {this.props.listItems}
                </div>
            </div>
        );
    }
}

export default Table;