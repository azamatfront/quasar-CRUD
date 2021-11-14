<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-table
			title="Products"
			:rows="products"
			:columns="columns"
			row-key="id"
    >
		<template v-slot:top>
			<q-btn color="primary" icon="add" label="Add Product" @click="show_dialog = true" />
			<div class="q-pa-sm q-gutter-sm">
				<q-dialog v-model="show_dialog">
					<q-card>
						<q-card-section class="row">
            	<div class="text-h6">Add new product!</div>
							<q-space />
							<q-btn flat round dense icon="close" v-close-popup />
          	</q-card-section>

						<form @submit.prevent="addNewProduct">
							<q-card-section class="q-pt-none" style="width: 400px">

								<div class="row q-mb-md">
									<q-input
									  class="col full-width"
									  outlined
									  v-model="addProduct.product_type_id"
									  label="Product type id" />
								</div>

								<div class="row q-mb-md">
									<q-input
									  class="col"
									  outlined
									  v-model="addProduct.name_uz"
									  label="Product name" />
								</div>

								<div class="row q-mb-md">
									<q-input
									  class="col"
									  outlined
									  v-model="addProduct.cost"
									  label="Product cost" />
								</div>

								<div class="row q-mb-md">
									<q-input
									  class="col"
									  outlined
									  v-model="addProduct.address"
									  label="Product address" />
								</div>
							</q-card-section>

							<q-card-actions align="right">
								<q-btn type="submit" flat label="Create Product" color="primary" v-close-popup></q-btn>
							</q-card-actions>
						</form>

					</q-card>
				</q-dialog>
			</div>
		</template>

		<template v-slot:body="props">
			<q-tr :props="props">

				<q-td :props="props" key="id">
					{{props.row.id}}
				</q-td>
				
				<q-td :props="props" key="product_type_id">
					<q-input outlined v-if="editing === props.row" v-model="props.row.product_type_id" />
					<div v-else>{{props.row.product_type_id}}</div>
				</q-td>

				<q-td :props="props" key="name_uz">
					<q-input outlined v-if="editing === props.row" v-model="props.row.name_uz" />
					<div v-else>{{props.row.name_uz}}</div>
				</q-td>

				<q-td :props="props" key="cost">
					<q-input outlined v-if="editing === props.row" v-model="props.row.cost" />
					<div v-else>{{props.row.cost}}</div>
				</q-td>

				<q-td :props="props" key="address">
					<q-input outlined v-if="editing === props.row" v-model="props.row.address" />
					<div v-else>{{props.row.address}}</div>
				</q-td>

				<q-td :props="props" key="created_date">
					<div>{{props.row.created_date}}</div>
				</q-td>

				<div v-if="editing === props.row">
					<q-td  key="actions" :props="props">
						<q-btn color="blue" label="Save" @click="editProduct(props.row)" class="q-mr-sm" size=sm></q-btn>
						
						<q-btn color="red" label="Cancel"  @click="editing = null" size=sm></q-btn>
					</q-td>
				</div>

				<div v-else>
					<q-td key="actions" :props="props">
						<q-btn color="blue" label="Edit" icon="edit" @click="editMode(props.row)" class="q-mr-sm" size=sm></q-btn>
						
						<q-btn color="red" label="Delete" icon="delete" @click="deleteItem(props.row.id)" size=sm></q-btn>
					</q-td>
				</div>

			</q-tr>
		</template>
		</q-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageProduct",
	data() {
		return {
			products: [],
			addProduct: {
				product_type_id: "",
        name_uz: "",
        cost: "",
        address: "",
        created_date: Date.now()
			},
			editing: null,
			show_dialog: false,

			columns: [
				{label: 'ID', field: 'id', name: 'id', align: 'center', sortable: true},
				{label: 'Product ID', field: 'product_type_id', name: 'product_type_id', align: 'center', sortable: true},
				{label: 'Product Name', field: 'name_uz', name: 'name_uz', align: 'left', sortable: true},
				{label: 'Product Cost', field: 'cost', name: 'cost', align: 'center', sortable: true},
				{label: 'Product Address', field: 'address', name: 'address', align: 'left', sortable: true},
				{label: 'Product Created Date', field: 'created_date', name: 'created_date', align: 'center', sortable: true},
				{
					name: "actions",
					label: "Actions",
					field: "actions",
					align: "center"
				}
			]
		}
	},
	mounted() {
		this.getProducts()
	},
	methods: {
		async getProducts() {
			const response = await fetch('http://94.158.54.194:9092/api/product', {
				params: {
					page: 1,
					perPage: 10
				}
			})
			const data = await response.json()
			this.products = data
		},

		async addNewProduct() {
			const response = await fetch('http://94.158.54.194:9092/api/product', {
				method: 'POST',
				body: JSON.stringify(this.addProduct),
				headers: {
					"Content-Type": "application/json"
				}
			})
			this.addProduct = {
				product_type_id: "",
        name_uz: "",
        cost: "",
        address: "",
        created_date: Date.now()
			}
			this.getProducts()
			const data = await response.json()
			this.products = [...this.products, data]
		},

		async editProduct(updatedProduct) {
      try {
        const response = await fetch(
          `http://94.158.54.194:9092/api/product/`,
          {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: { "Content-Type": "application/json" }
          }
        )
        const data = await response.json()
        this.products = this.products.map(product =>
          product.id === id ? data : product
        )
      } catch (error) {
        console.error(error)
      }
    },

		async deleteItem(id) {
			await fetch(`http://94.158.54.194:9092/api/product/${id}`, {
				method: "DELETE"
			});
			this.products = this.products.filter(product => product.id !== id)
    },

		editMode(id) {
      this.editing = id
    },

		editProduct(product) {
      if (
				product.product_type_id === '' || 
				product.name_uz === '' || 
				product.cost === '' || 
				product.address === '' || 
				product.created_date === ''
			) return
      this.editing = null
    },
	}
})
</script>
