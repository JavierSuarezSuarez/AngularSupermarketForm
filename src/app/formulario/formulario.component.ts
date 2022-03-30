import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

//Interface to define Product characteristics
interface Product {
  id: number;
  nombre : string;
  categoria : string;
  precio : string;
}


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {


  //-------------------------------------------------------------- Section texts ---------------------------------------------//

  //Texts to help the user
  formtext = "Por favor, introduce el producto que deseas añadir al supermercado:";
  tabletext = "En la siguiente tabla puedes observar, modificar y eliminar los productos añadidos";

  //Propeties to manage "add" and "confirm changes" buttons visibility
  addbtnVisible = true;
  confirmbtnVisible = false;


  //-------------------------------------------------------------- Table config ----------------------------------------------//
  @ViewChild(MatTable) table!: MatTable<Element>; //This makes the table to look for modifications and enables the renderRows() method
  columnasTabla: string[] = ['id','nombre', 'categoria', 'precio', 'editar', 'eliminar'];//Table columns


  //-------------------------------------------------------------- Product parameters ----------------------------------------//
  product!: Product; //With the ! we omit the initialization errors
  productlist : Product[] = []; //Array of added products


  //############################################################## Methods ##################################################//

  
  constructor() { }

  ngOnInit(): void {
    this.resetForm();
  }


  //------------------------------------------------------------------Aux methods--------------------------------------------//

  //Resets the current product attributes also reseting the form 
  resetForm() {
    this.product = {id: 0, nombre : "", categoria: "", precio: ""};
  }

  //Works after clicking on a product's edit button.
  //Makes invisible the add btn and makes visible the confirm changes btn. Also it resets the form.
  confirmUpdate () {
    this.addbtnVisible = true;
    this.confirmbtnVisible = false;
    this.resetForm();
  }

  //------------------------------------------------------------------CUD methods--------------------------------------------//
  
  //Adds a product to the array

  //At first, it looks for the € symbol in the "precio" attribute. If it's not set, it concatenates the symbol
  //Then, it sets the id attribute for the new product taking into account the array elements
  //Finally, it pushes into the array the new element and refreshes the table and resets the form
  addProduct() {
    if(this.product.precio.indexOf("€") == -1) {
      this.product.precio = this.product.precio + " €";
    }

    var idvec = -1;

    for(var i = 0; i < this.productlist.length; i++) {
      if(this.productlist[i].id > idvec) {
          idvec = this.productlist[i].id;
      }
    }
    idvec++;
    this.product.id = idvec;
   
    this.productlist.push(this.product);
    this.table.renderRows();
    this.resetForm();
  }

  //Modifies a product in the array

  //At first, it changes the visibility of "add" and "confirm changes" buttons. 
  //Then, it finds the product with the id given in the array and sets it in the form waiting for modifications
  updateProduct(idrecogida: number) {
    this.addbtnVisible = false;
    this.confirmbtnVisible = true;
    for(var i = 0; i < this.productlist.length; i++) {
      if(this.productlist[i].id == idrecogida) {
        this.product = this.productlist[i];
      }
    }
  }


  //Deletes a product from the array

  //Finds in the array the product with the id given and deletes it refreshing the table 
  //and reseting the form
  deleteProduct(idrecogida: number) {
    for(var i = 0; i < this.productlist.length; i++) {
      if(this.productlist[i].id == idrecogida) {
        this.productlist.splice(i, 1);
        this.table.renderRows();
        this.resetForm();
      }
    }
  }
}