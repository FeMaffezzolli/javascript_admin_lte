class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
  } // closing constructor()

  onSubmit() {
    this.formEl.addEventListener("submit", event => {
      event.preventDefault();

      let values = this.getValues();

      this.getPhoto().then(
        (content)=>{
          values.photo = content;
          this.addUserLine(values);
      },
        (e)=>{
        console.error(e);
      }
      );

    });
  } // closing onSubmit()

  getPhoto() {

    return new Promise((resolve, reject)=>{

      let fileReader = new FileReader();

      let elements = [...this.formEl.elements].filter(item=>{
        if (item.name === 'photo') {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = ()=>{
        resolve(fileReader.result);
      };

      fileReader.onerror = (e)=>{
        reject(e);
      };

      fileReader.readAsDataURL(file);
    });

    }

  getValues() {
    let user = {};

    [...this.formEl.elements].forEach(function(field, index) {
      if (field.name == "gender") {
        if (field.checked) user[field.name] = field.value;
      } else {
        user[field.name] = field.value;
      }
    });

    return new User(
      user.name,
      user.gender,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  } // closing getValues()

  addUserLine(userData) {
    this.tableEl.innerHTML = `
      <tr>
        <td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.admin}</td>
        <td>${userData.birth}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
      </tr>
    `;
  }
}
