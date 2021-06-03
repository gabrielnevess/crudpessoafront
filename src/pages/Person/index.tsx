import React, { useState, useEffect } from "react";
import {
    CircularProgress,
    createStyles,
    Fab,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Pageable } from "../../interfaces/Pageable";
import { Pessoa } from "../../interfaces/Pessoa";
import { getAllPerson } from "../../services/personService";
import useStyles from "./useStyles";
import AddIcon from "@material-ui/icons/Add";

interface IViewPerson {
    title: string;
}

export const ViewPerson: React.FC<IViewPerson> = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [pageable, setPageable] = useState<Pageable<Pessoa>>({} as Pageable<Pessoa>);
    const [loading, setLoading] = useState<boolean>(false);

    // paginação
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);


    const getData = async (page: number, rowsPerPage: number) => {
        setLoading(true);
        const data = await getAllPerson(page, rowsPerPage);
        setPageable(data);
        setLoading(false);
    }

    useEffect(() => {
        getData(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const useToolbarStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        title: {
            flex: '1 1 100%',
        },
    }),
    );

    const EnhancedTableToolbar = (props: IViewPerson) => {
        const classes = useToolbarStyles();
        const { title } = props;

        return (
            <Toolbar className={classes.root}>
                <Typography className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            </Toolbar>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>

                <Paper className={classes.paper}>
                    <EnhancedTableToolbar {...props} />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Código</TableCell>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="left">E-mail</TableCell>
                                    <TableCell align="left">Data de Nascimento</TableCell>
                                    <TableCell align="left">Sexo</TableCell>
                                    <TableCell align="left">Celular</TableCell>
                                    <TableCell align="left">Telefone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <React.Fragment>
                                    {loading ?
                                        <TableRow>
                                            <TableCell align="center" colSpan={7}>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow> :
                                        <React.Fragment>
                                            {(pageable?.content && pageable?.content?.length !== 0) ?
                                                pageable?.content?.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="left">{row.pessoaId}</TableCell>
                                                        <TableCell align="left">{row.nome}</TableCell>
                                                        <TableCell align="left">{row.email}</TableCell>
                                                        <TableCell align="left">{row.dataNascimento}</TableCell>
                                                        <TableCell align="left">{row.sexo}</TableCell>
                                                        <TableCell align="left">{row.celular}</TableCell>
                                                        <TableCell align="left">{row.telefone}</TableCell>
                                                    </TableRow>
                                                )) :
                                                <TableRow>
                                                    <TableCell align="center" colSpan={7}>
                                                        <Typography variant="subtitle1">Nenhum Registro encontrado!</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            }
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage={"Qtd de Pessoas"}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pageable?.totalElements || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <Tooltip title="Adicionar Pessoa">
                    <Fab
                        name="adicionar-pessoa"
                        color="secondary"
                        aria-label="add"
                        className={classes.fab}
                        onClick={() => false}>
                        <AddIcon />
                    </Fab>
                </Tooltip>

            </div>
        </div>
    );

}

export default ViewPerson;

