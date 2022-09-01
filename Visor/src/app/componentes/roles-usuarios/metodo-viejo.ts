/* marcarCheckbox(event: any) {
    if (event.checked) {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = true;
        }});
      this.tempArray = this.arrayBack.filter((e: any) => e.rol == event.source.value);
      if (this.tempArray.length != 0) {
        this.usuarios = [];
        this.newArray.push(this.tempArray);
        this.newArray.forEach(element => {
        let firstArray = element;
        for (let i=0;i<firstArray.length;i++) {
          let obj = firstArray[i];
          this.usuarios.push(obj);
          this.dataSource = new MatTableDataSource(this.usuarios);
        }});
      } else {
        let aux = 0;
        this.roles.forEach(rol => {
          if (rol.check == true && rol.nombre != event.source.value) {
            aux++;
          }
        });
        if (aux == 0) {
          this.usuarios = [];
          this.dataSource = new MatTableDataSource(this.usuarios);
          console.log(this.dataSource)
        }
      }
    } else {
      this.roles.forEach(rol => {
        if (rol.nombre == event.source.value) {
          rol.check = false;
        }});
      this.tempArray = this.usuarios.filter((e: any) => e.rol != event.source.value);
      if (this.tempArray.length != 0) {
      this.newArray = [];
      this.usuarios = [];
      this.newArray.push(this.tempArray);
      this.newArray.forEach(element => {
        let firstArray = element;
        for (let i=0;i<firstArray.length;i++) {
          let obj = firstArray[i];
          this.usuarios.push(obj);
          this.dataSource = new MatTableDataSource(this.usuarios);
        }});
      } else {
        let aux = 0;
        this.roles.forEach(rol => {
          if (rol.check == true && rol.nombre != event.source.value) {
            aux++;
          }
        });
        if (aux == 1) {
          this.usuarios = [];
          this.dataSource = new MatTableDataSource(this.usuarios);
        }
      }
    }
  if (this.roles[0].check == false && this.roles[1].check == false && this.roles[2].check == false) {
    this.usuarios = this._usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
  }
} */