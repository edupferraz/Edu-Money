import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable(){
    useEffect(() => {
        api.get('transactions')
        .then(response => console.log(response.data))
    }, []);

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Cost</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>IPhone</td>
                        <td className="withdraw">- $4.000</td>
                        <td>Equipament</td>
                        <td>28/07/2022</td>
                    </tr>

                    <tr>
                        <td>Job</td>
                        <td className="deposit">+ $8.000</td>
                        <td>Equipament</td>
                        <td>25/07/2022</td>
                    </tr>

                    <tr>
                        <td>Air Pods</td>
                        <td className="withdraw">- $1.000</td>
                        <td>Equipament</td>
                        <td>20/07/2022</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
}