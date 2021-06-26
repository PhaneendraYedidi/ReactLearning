import React from "react";

interface ProductCategoryRowProps {
  category : string;
}
class ProductCategoryRow extends React.Component<ProductCategoryRowProps> {

  constructor(props: ProductCategoryRowProps) {
    super(props);
    
  }
    render() {
      const category = this.props.category;
      return (
        <tr>
          <th colSpan={2}>
            {category}
          </th>
        </tr>
      );
    }
  }

  interface ProductRowProps{
    product : any;
  }
  
  class ProductRow extends React.Component<ProductRowProps> {
    constructor(props: ProductRowProps) {
      super(props)
    }
    render() {
      const product = this.props.product;
      const name = product.stocked ?
        product.name :
        <span style={{color: 'red'}}>
          {product.name}
        </span>;
  
      return (
        <tr>
          <td>{name}</td>
          <td>{product.price}</td>
        </tr>
      );
    }
  }
  
  interface ProductTableProps {
    filterText: string;
    inStockOnly: boolean;
    products: any;
  }
  class ProductTable extends React.Component<ProductTableProps> {
    constructor(props: ProductTableProps){
      super(props)
    }
    render() {
      const filterText = this.props.filterText;
      const inStockOnly = this.props.inStockOnly;
  
      const rows: any = [];
      let lastCategory: any = null;
  
      this.props.products.forEach((product: any) => {
        if (product.name.indexOf(filterText) === -1) {
          return;
        }
        if (inStockOnly && !product.stocked) {
          return;
        }
        if (product.category !== lastCategory) {
          rows.push(
            <ProductCategoryRow
              category={product.category}
              key={product.category} />
          );
        }
        rows.push(
          <ProductRow
            product={product}
            key={product.name}
          />
        );
        lastCategory = product.category;
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  
  interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (filterText: string) => void;
    onInStockChange: (inStock: boolean) => void;
  }

  class SearchBar extends React.Component<SearchBarProps> {
    constructor(props: SearchBarProps) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    
    handleFilterTextChange(e: any) {
      this.props.onFilterTextChange(e.target.value);
    }
    
    handleInStockChange(e: any) {
      this.props.onInStockChange(e.target.checked);
    }
    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <p>
            <input
              type="checkbox"
              checked={this.props.inStockOnly}
              onChange={this.handleInStockChange}
            />
            {' '}
            Only show products in stock
          </p>
        </form>
      );
    }
  }
  
  interface FilterableProductTableProps {
    products: object[]
  }

  interface FilterableProductTableState {
    filterText: string,
    inStockOnly: boolean
  }

  class FilterableProductTable extends React.Component<FilterableProductTableProps, FilterableProductTableState> {

    constructor(props: FilterableProductTableProps, state: FilterableProductTableState) {
      super(props,state);
      this.state = {
        filterText: '',
        inStockOnly: false
      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }
  
    handleFilterTextChange(filterText: string) {
      this.setState({
        filterText: filterText
      });
    }
    
    handleInStockChange(inStockOnly: boolean) {
      this.setState({
        inStockOnly: inStockOnly
      })
    }
  
    render() {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockChange={this.handleInStockChange}
          />
          <ProductTable
            products={this.props.products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
      );
    }
  }
  
  
  const PRODUCTS : object[] = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];
  
  export default function ProductsTSX() {
      return <FilterableProductTable products={PRODUCTS} />
  }