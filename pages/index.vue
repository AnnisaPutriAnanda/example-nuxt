
<template>
  <div class="flex justify-center p-4">
    <button @click="createData()" id="button" data-modal-toggle="modal" data-modal-target="modal" type="button"
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Create
      Data</button>
  </div>

  <div id="modal" tabindex="-100" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
            Terms of Service
          </h3>
          <button id="closeButton" data-modal-hide="modal" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form id="studentForm" @submit.prevent="storeStudent()">
            <input type="hidden" id="id_student">
            <div v-for="err in error">
           <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span class="font-medium" v-if="err != []">{{ err }}</span>
           </div>
            </div>

            <div class="input-group group">
              <input type="number" name="NIS_student" id="NIS_student" class="input-text peer" v-model="field.NIS"
                 />
              <label for="NIS_student">NIS</label>
            </div>
            <div class="input-group group">
              <input type="text" name="name_student" id="name_student" class="input-text peer" v-model="field.name"
                />
              <label for="name_student">Name</label>
            </div>
            <div class="input-group group">
              <input type="text" name="grade_student" id="grade_student" class="input-text peer" v-model="field.grade"
                />
              <label for="grade_student">Grade</label>
            </div>
            <div class="input-group group">
              <input type="text" name="major_student" id="major_student" class="input-text peer" v-model="field.major"
                />
              <label for="major_student">Major</label>
            </div>
            <div class="input-group group">
              <input type="date" name="birth_student" id="birth_student" class="input-text peer"
                v-model="field.date_at_birth" required />
              <label for="birth_student">Birth Date</label>
            </div>
            <div class="input-group group">
              <select name="status_student" id="status_student" class="input-text peer" v-model="field.status" required>
                <option value="" disabled selected hidden>Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <label for="status_student">Status</label>
              </select>
            </div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
              <button type="button" @click="resetForm()"
                class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="container-sm">

    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">

            <table>
              <thead>
                <tr>
                  <th scope="col">NIS</th>
                  <th scope="col">Name</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Major</th>
                  <th scope="col">Birth Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="view in student" :key="view.id">
                  <td class="index">{{ view.NIS }}</td>
                  <td>{{ view.name }}</td>
                  <td>{{ view.grade }}</td>
                  <td>{{ view.major }}</td>
                  <td>{{ view.date_at_birth }}</td>
                  <td v-if="view.status == 'active' || view.status == 'inactive'"
                  :class="{ 'text-red-500': view.status === 'inactive', 'text-green-500': view.status === 'active' }"
                  >{{ view.status }}</td>
                  <td>
                    <button @click="editStudent(view.id)"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                    <button @click="deleteStudent(view.id)"
                      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

    <button @click="hapusStudent()" data-modal-target="popup-modal" data-modal-toggle="popup-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button>

<div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button @onclick="tutupModal()" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button @onclick="tutupModal()" data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div>

  </div>
</template>
  
<script>
import { initFlowbite } from 'flowbite'
import { Modal } from 'flowbite'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      student: [],

      config: useRuntimeConfig(),

      field: {
        NIS: '',
        name: '',
        grade: '',
        major: '',
        date_at_birth: '',
        status: ''
      },

      error: [],
    }
  },
  mounted() {
    this.listStudent();
    initFlowbite();
  },
  methods: {

    hideModal() {
      this.listStudent();
      const $modal = document.getElementById("modal");
      const yeyey = new Modal($modal);
      yeyey.hide();
    },

    listStudent() {
      fetch(`${this.config.public.apiBase}/student`,
        {
          method: 'get'
        }).then(response => {
          return response.json()
        }).then(data => {
          this.student = data;
        })
    },


    editStudent(id) {
      this.error = []
      fetch(`${this.config.public.apiBase}/student/${id}`, {
        method: 'GET',
      })
        .then(response => {
          if (response.status === 204) {
          } else {
            return response.json();
          }
        })
        .then(data => {
          this.field = data
          const $modal = document.getElementById("modal");
          const yeyey = new Modal($modal);
          yeyey.show();
          $('#id_student').val(data.id);
          $('#NIS_student').val(data.NIS);
          $('#name_student').val(data.name);
          $('#grade_student').val(data.grade);
          $('#major_student').val(data.major);
          $('#birth_student').val(data.date_at_birth);
          $('#status_student').val(data.status);
        }).catch(error => {
          console.error('Error:', error);
        });



    },

    createData() {
      document.getElementById("studentForm").reset();
      this.field = {
        NIS: '',
        name: '',
        grade: '',
        major: '',
        date_at_birth: '',
        status: ''
      },
      this.error = []
    },

    resetForm() {
      this.field = {
        NIS: '',
        name: '',
        grade: '',
        major: '',
        date_at_birth: '',
        status: ''
      }
      this.error = []
    },


    storeStudent() {

      var id = document.getElementById("id_student").value

      if (id == '') {
        fetch(`${this.config.public.apiBase}/student`, {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.field)
        }).then(response => {
          return response.json()
        }).then(message => {
          if(message != ''){

            
          this.error = message
          console.log(this.error)
 

          }else{

            this.listStudent();
            Swal.fire('Saved!', '', 'success')

          }
        })

      } else {

        var NIS = document.getElementById("NIS_student").value
        var name = document.getElementById("name_student").value
        var grade = document.getElementById("grade_student").value
        var major = document.getElementById("major_student").value
        var date_at_birth = document.getElementById("birth_student").value
        var status = document.getElementById("status_student").value

        fetch(`${this.config.public.apiBase}/student/${id}`, {
          method: 'put',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            NIS: NIS,
            name: name,
            grade: grade,
            major: major,
            date_at_birth: date_at_birth,
            status: status
          }),
        }).then(response => {
          return response.json()
        }).then(message => {
          if(message != ''){

            
          this.error = message
          console.log(this.error)
 

          }else{

            this.listStudent();
            Swal.fire('Saved!', '', 'success')

          }
        })
      }
    },

    deleteStudent(id) {
      Swal.fire({
        title: 'Do you want to delete the data?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
        icon: 'warning'
      }).then((result) => {

        if (result.isConfirmed) {

          fetch(`${this.config.public.apiBase}/student/${id}`,
            {
              method: 'delete'
            }).then(response => {
              return response.json()
            }).then(data => {
              this.listStudent();
            }).catch(error => {
              console.log(error);
              Swal.fire('Not Saved!', '', 'error')
            })
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    },

    hapusStudent(){
          const modal = document.getElementById("popup-modal");
          const yeyey = new Modal(modal);
          yeyey.show();
    },
    tutupModal(){
          const modal = document.getElementById("popup-modal");
          const yeyey = new Modal(modal);
          yeyey.hide();
    }
  }
}
</script>
  
<style lang="postcss" scoped>

table {
  @apply table-auto min-w-full text-left text-sm font-light
}

thead {
  @apply border-b font-medium dark:border-neutral-500
}

th {
  @apply px-6 py-4
}

tr {
  @apply border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600
}

td {
  @apply whitespace-nowrap px-6 py-4
}

.index {
  @apply font-medium
}

label {
  @apply peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
}

.input-text {
  @apply block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600
}

.input-group {
  @apply relative z-0 w-full mb-6
}
</style>
