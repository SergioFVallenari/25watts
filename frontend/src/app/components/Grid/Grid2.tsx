import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../../services/api';
import moment from 'moment-timezone';
import { Badge, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';


interface Column {
    title: string;
    data?: string;
    render?: (value: any, row?: any, rowIndex?: number) => React.ReactNode;
    className?: string;
    width?: string;
}

interface GridProps {
    columns?: any[];
    manejo_acciones?: Function;
}

const ResponsiveExample: React.FC<GridProps> = ({ columns = [], manejo_acciones }) => {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchGridData = async () => {
        if (!columns || columns.length === 0) return;
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(columns[0]);
            const content = response?.data?.content ?? [];
            setRows(content);
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? 'Error fetching data');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGridData();
    }, [setRows]);
    const cols: Column[] = columns[2] ?? [];
    const renderCellByTipo = (tipoTabla: string, col: any, row: any) => {
        const value = col.data ? row[col.data] : undefined;

        switch (tipoTabla) {
            case 'abm_cupones':
                switch (col.data) {
                    case 'valor':
                        return `$${value}`;
                    case 'fecha_expiracion':
                        return value ? moment(value).format('DD/MM/YYYY') : '-';
                    case 'estado':
                        return value === '0'
                            ? <Badge className="w-100 fs-6 rounded-pill" bg='success'>Activo</Badge>
                            : <Badge className="w-100 fs-6 rounded-pill" bg='danger'>Inactivo</Badge>;
                    case 'idcupones':
                        return (
                            <>
                                <Button className='btn-sm ms-2' onClick={() => manejo_acciones && manejo_acciones('cupones', row.idcupones, 'm', null)}><i className="fa fa-pencil"></i></Button>
                                <Button className='btn-sm ms-2' variant="danger" onClick={() => manejo_acciones && manejo_acciones('cupones', row.idcupones, 'b', null)}><i className="fa fa-trash"></i></Button>
                            </>
                        );
                    default:
                        return value ?? '-';
                }
            default:
                return value ?? '-';
        }
    };
    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    const filteredRows = rows.filter(row => {
        if (!searchTerm) return true;
        return cols.some(col => {
            const cellValue = col.data ? row[col.data] : '';
            return String(cellValue).toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const getPaginationGroup = (page: number, total: number) => {
        const delta = 2;
        const range = [];
        for (let i = Math.max(2, page - delta); i <= Math.min(total - 1, page + delta); i++) {
            range.push(i);
        }
        if (page - delta > 2) {
            range.unshift('...');
        }
        if (page + delta < total - 1) {
            range.push('...');
        }
        range.unshift(1);
        if (total > 1) range.push(total);
        return range;
    }
    return (
        <div>
            <Container className="d-flex justify-content-between align-items-center mb-3">
                <Form.Group className="" controlId="search">
                    <InputGroup className='rounded-pill'>
                        <InputGroup.Text>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <div className="d-flex align-items-center">
                    <Button className='rounded-pill m-2' onClick={() => manejo_acciones && manejo_acciones('cupones', '0', 'a', null)}>
                        {`Crear ${columns[1] || ''}`}
                    </Button>
                    <Button className='rounded-pill' variant="secondary" onClick={fetchGridData}>
                        <i className="fa fa-sync" aria-hidden="true"></i>
                    </Button>
                </div>
            </Container>


            <Table borderless hover striped responsive>
                <thead>
                    <tr className="text-center">
                        {cols.map((col, index) => (
                            <th key={index} className={col.className} style={{ width: col.width }}>
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-center rounded-3">
                    {currentRows.length === 0 ? (
                        <tr>
                            <td colSpan={cols.length}>No hay registros</td>
                        </tr>
                    ) : (
                        currentRows.map((row, rowIndex) => (
                            <tr key={row.idcupones ?? rowIndex}>
                                {cols.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {renderCellByTipo(columns[4], col, row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <Button
                    className="rounded-circle btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    <ChevronLeft size={16} />
                </Button>

                {getPaginationGroup(currentPage, totalPages).map((page, index) =>
                    page === '...' ? (
                        <span key={index} className="mx-1">...</span>
                    ) : (
                        <span
                            key={index}
                            className={`m-2 ${page === currentPage ? 'fs-5 text-decoration-underline' : 'fs-6'}`}
                            onClick={() => setCurrentPage(Number(page))}
                        >
                            {page}
                        </span>
                    )
                )}

                <Button
                    className="rounded-circle btn-sm"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
};

export default ResponsiveExample;
