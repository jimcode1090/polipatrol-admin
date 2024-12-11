import React, {useState} from "react";
import {Tab} from "semantic-ui-react";
import { BarChartComponent } from "./BarChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import "./Blog.scss";

export function Blog() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
            render: () => (
                <Tab.Pane attached={false}>
                    <h1 className={{textAlign: "center"}}>Estadística</h1>
                    <div style={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>

                        <BarChartComponent/>
                        <PieChartComponent/>
                    </div>

                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            <div className="blog-page">
                <Tab menu={{secondary: true}} panes={panes}/>
            </div>
        </>
    );
}
