class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
  } // closing constructor()

  onSubmit() {
    this.formEl.addEventListener("submit", event => {
      event.preventDefault();

      this.addUserLine(this.getValues());
    });
  } // closing onSubmit()

  getValues() {
    let user = {};

    let fields = Array.from(this.formEl);

    fields.forEach(function(field, index) {
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
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
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
