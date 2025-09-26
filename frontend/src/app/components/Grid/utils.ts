export const resuelve_tabla_by_tipo = (tipo: any) => {
    const array_tipo = [];
    const columns_cupones = [
        { data: 'codigo', title: 'Codigo', name: 'codigo' },
        { data: 'descripcion', title: 'Descripcion', name: 'descripcion' },
        { data: 'valor', title: 'Valor', name: 'valor' },
        { data: 'fecha_expiracion', title: 'Fecha Expiracion', name: 'fecha_expiracion' },
        { data: 'estado', title: 'Estado', name: 'estado' },
        { data: 'idcupones', title: 'Acciones', searchable: false },
    ]
    switch (tipo) {
        case 'cupones': array_tipo.push('/api/cupones', 'Cupones', columns_cupones, 10, 'abm_cupones', 'abmc', [1, 2, 3, 4, 5], 'landscape', [[0, 'desc']]); break;
    }
    return array_tipo
}
