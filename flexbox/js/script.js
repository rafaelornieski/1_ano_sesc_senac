document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const descriptions = {
        direction: {
            row: "Organiza os itens horizontalmente, da esquerda para a direita.",
            "row-reverse": "Organiza os itens horizontalmente, da direita para a esquerda.",
            column: "Organiza os itens verticalmente, de cima para baixo.",
            "column-reverse": "Organiza os itens verticalmente, de baixo para cima."
        },
        justify: {
            "flex-start": "Posiciona todos os itens no início do eixo principal.",
            center: "Centraliza os itens ao longo do eixo principal.",
            "flex-end": "Posiciona todos os itens no final do eixo principal.",
            "space-between": "Distribui o espaço somente entre os itens.",
            "space-around": "Cria espaço ao redor de cada item, com espaços menores nas extremidades.",
            "space-evenly": "Distribui espaços iguais entre os itens e também nas extremidades."
        },
        align: {
            stretch: "Estica os itens no eixo secundário quando eles não possuem tamanho fixo nesse eixo.",
            "flex-start": "Posiciona todos os itens no início do eixo secundário.",
            center: "Centraliza todos os itens no eixo secundário.",
            "flex-end": "Posiciona todos os itens no final do eixo secundário.",
            baseline: "Alinha os itens pela linha de base de seus textos."
        },
        gap: {
            "0px": "Remove completamente o espaço entre os itens.",
            "10px": "Cria 10 pixels de espaço entre linhas e colunas.",
            "20px": "Cria 20 pixels de espaço entre linhas e colunas.",
            "40px": "Cria 40 pixels de espaço entre linhas e colunas.",
            "60px": "Cria 60 pixels de espaço entre linhas e colunas."
        },
        wrap: {
            nowrap: "Mantém todos os itens na mesma linha, mesmo quando falta espaço.",
            wrap: "Permite que os itens quebrem para linhas seguintes.",
            "wrap-reverse": "Permite a quebra, mas posiciona as novas linhas na direção inversa."
        },
        flow: {
            "row nowrap": "Organiza os itens em linha e impede a quebra para novas linhas.",
            "row wrap": "Organiza os itens em linha e permite a quebra para novas linhas.",
            "row wrap-reverse": "Organiza em linha e cria novas linhas na direção inversa.",
            "row-reverse wrap": "Inverte a ordem horizontal e permite a quebra de linha.",
            "column nowrap": "Organiza os itens em coluna e impede a quebra.",
            "column wrap": "Organiza os itens em coluna e cria novas colunas quando necessário.",
            "column wrap-reverse": "Organiza em coluna e cria novas colunas na direção inversa.",
            "column-reverse wrap": "Inverte a direção vertical e permite a criação de novas colunas."
        },
        alignContent: {
            stretch: "Estica as linhas para preencher o espaço disponível no eixo secundário.",
            "flex-start": "Agrupa todas as linhas no início do eixo secundário.",
            center: "Agrupa todas as linhas no centro do eixo secundário.",
            "flex-end": "Agrupa todas as linhas no final do eixo secundário.",
            "space-between": "Distribui o espaço entre as linhas, sem espaço nas extremidades.",
            "space-around": "Distribui espaço ao redor de cada linha.",
            "space-evenly": "Distribui espaços iguais entre as linhas e as extremidades."
        },
        order: {
            "-1": "Move o Item 3 para antes dos itens que possuem order: 0.",
            "0": "Mantém o Item 3 na posição definida pelo HTML.",
            "1": "Move o Item 3 para depois dos itens que possuem order: 0."
        },
        grow: {
            "0": "O Item 3 não participa da distribuição do espaço livre.",
            "1": "O Item 3 participa do crescimento na mesma proporção que os demais.",
            "2": "O Item 3 recebe aproximadamente o dobro da participação dos demais.",
            "3": "O Item 3 recebe aproximadamente o triplo da participação dos demais.",
            "5": "O Item 3 recebe uma participação cinco vezes maior que cada item com valor 1."
        },
        shrink: {
            "0": "O Item 3 não encolhe; os demais precisam absorver a redução.",
            "1": "O Item 3 encolhe na mesma proporção que os demais.",
            "2": "O Item 3 perde espaço duas vezes mais rapidamente que os demais.",
            "3": "O Item 3 perde espaço três vezes mais rapidamente que os demais.",
            "5": "O Item 3 é o que mais encolhe quando o espaço fica insuficiente."
        },
        basis: {
            "50px": "O tamanho inicial considerado para o Item 3 será de 50 pixels.",
            "100px": "O tamanho inicial considerado para o Item 3 será de 100 pixels.",
            "150px": "O tamanho inicial considerado para o Item 3 será de 150 pixels.",
            "200px": "O tamanho inicial considerado para o Item 3 será de 200 pixels.",
            "300px": "O tamanho inicial considerado para o Item 3 será de 300 pixels.",
            auto: "Usa o tamanho definido pela largura ou pelo conteúdo do item."
        },
        flex: {
            "0 1 auto": "Não cresce, pode encolher e usa o tamanho automático como base.",
            "1 1 auto": "Pode crescer e encolher, mantendo o tamanho automático como base.",
            "1 0 150px": "Pode crescer, não encolhe e começa com uma base de 150 pixels.",
            "2 1 100px": "Cresce com proporção 2, pode encolher e começa com 100 pixels.",
            "0 0 200px": "Não cresce nem encolhe e mantém uma base de 200 pixels.",
            "1": "Forma resumida normalmente interpretada como 1 1 0%.",
            auto: "Forma resumida normalmente interpretada como 1 1 auto.",
            none: "Forma resumida normalmente interpretada como 0 0 auto."
        },
        alignSelf: {
            auto: "Herda o align-items: center definido no container.",
            stretch: "Estica somente o Item 3 ao longo do eixo secundário.",
            "flex-start": "Posiciona somente o Item 3 no início do eixo secundário.",
            center: "Centraliza somente o Item 3 no eixo secundário.",
            "flex-end": "Posiciona somente o Item 3 no final do eixo secundário.",
            baseline: "Alinha a linha de base do Item 3 com a linha de base dos demais."
        }
    };

    function getElement(selector) {
        const element = document.querySelector(selector);

        if (!element) {
            console.warn(`Elemento não encontrado: ${selector}`);
        }

        return element;
    }

    function setActiveButton(button, selector) {
        document.querySelectorAll(selector).forEach(currentButton => {
            currentButton.classList.remove("active");
            currentButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
    }

    function setActiveByValue(selector, dataKey, value) {
        document.querySelectorAll(selector).forEach(button => {
            const isActive = button.dataset[dataKey] === value;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    function createController({
        buttonSelector,
        targetSelector,
        outputSelector,
        descriptionSelector,
        datasetKey,
        styleProperty,
        descriptionGroup,
        afterChange
    }) {
        const target = getElement(targetSelector);
        const output = getElement(outputSelector);
        const description = getElement(descriptionSelector);
        const buttons = document.querySelectorAll(buttonSelector);

        if (!target || !output || !description || buttons.length === 0) {
            return;
        }

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const value = button.dataset[datasetKey];

                if (typeof value !== "string") {
                    return;
                }

                target.style[styleProperty] = value;
                output.textContent = value;
                description.textContent = descriptions[descriptionGroup][value] ?? "";
                setActiveButton(button, buttonSelector);

                if (typeof afterChange === "function") {
                    afterChange(value);
                }
            });
        });
    }

    function resetController({
        buttonSelector,
        targetSelector,
        outputSelector,
        descriptionSelector,
        datasetKey,
        styleProperty,
        defaultValue,
        descriptionGroup,
        afterReset
    }) {
        const target = getElement(targetSelector);
        const output = getElement(outputSelector);
        const description = getElement(descriptionSelector);

        if (!target || !output || !description) {
            return;
        }

        target.style[styleProperty] = defaultValue;
        output.textContent = defaultValue;
        description.textContent = descriptions[descriptionGroup][defaultValue] ?? "";
        setActiveByValue(buttonSelector, datasetKey, defaultValue);

        if (typeof afterReset === "function") {
            afterReset(defaultValue);
        }
    }

    function updateDirectionAxes(value) {
        const mainAxis = getElement(".direction-main-axis");
        const crossAxis = getElement(".direction-cross-axis");

        if (!mainAxis || !crossAxis) {
            return;
        }

        const isColumn = value.includes("column");
        const isReverse = value.includes("reverse");

        mainAxis.textContent = isColumn
            ? `Eixo principal ${isReverse ? "↑" : "↓"}`
            : `Eixo principal ${isReverse ? "←" : "→"}`;

        crossAxis.textContent = isColumn
            ? "Eixo secundário →"
            : "Eixo secundário ↓";

        mainAxis.classList.toggle("vertical-axis-label", isColumn);
        crossAxis.classList.toggle("horizontal-axis-label", isColumn);
    }

    createController({
        buttonSelector: "[data-direction]",
        targetSelector: ".direction-container",
        outputSelector: ".direction-value",
        descriptionSelector: ".direction-description",
        datasetKey: "direction",
        styleProperty: "flexDirection",
        descriptionGroup: "direction",
        afterChange: updateDirectionAxes
    });

    createController({
        buttonSelector: "[data-justify]",
        targetSelector: ".justify-container",
        outputSelector: ".justify-value",
        descriptionSelector: ".justify-description",
        datasetKey: "justify",
        styleProperty: "justifyContent",
        descriptionGroup: "justify"
    });

    createController({
        buttonSelector: "[data-align]",
        targetSelector: ".align-container",
        outputSelector: ".align-value",
        descriptionSelector: ".align-description",
        datasetKey: "align",
        styleProperty: "alignItems",
        descriptionGroup: "align"
    });

    createController({
        buttonSelector: "[data-gap]",
        targetSelector: ".gap-container",
        outputSelector: ".gap-value",
        descriptionSelector: ".gap-description",
        datasetKey: "gap",
        styleProperty: "gap",
        descriptionGroup: "gap"
    });

    createController({
        buttonSelector: "[data-wrap]",
        targetSelector: ".wrap-container",
        outputSelector: ".wrap-value",
        descriptionSelector: ".wrap-description",
        datasetKey: "wrap",
        styleProperty: "flexWrap",
        descriptionGroup: "wrap"
    });

    createController({
        buttonSelector: "[data-flow]",
        targetSelector: ".flow-container",
        outputSelector: ".flow-value",
        descriptionSelector: ".flow-description",
        datasetKey: "flow",
        styleProperty: "flexFlow",
        descriptionGroup: "flow"
    });

    createController({
        buttonSelector: "[data-align-content]",
        targetSelector: ".align-content-container",
        outputSelector: ".align-content-value",
        descriptionSelector: ".align-content-description",
        datasetKey: "alignContent",
        styleProperty: "alignContent",
        descriptionGroup: "alignContent"
    });

    createController({
        buttonSelector: "[data-order]",
        targetSelector: ".item-order",
        outputSelector: ".order-value",
        descriptionSelector: ".order-description",
        datasetKey: "order",
        styleProperty: "order",
        descriptionGroup: "order"
    });

    createController({
        buttonSelector: "[data-grow]",
        targetSelector: ".item-grow",
        outputSelector: ".grow-value",
        descriptionSelector: ".grow-description",
        datasetKey: "grow",
        styleProperty: "flexGrow",
        descriptionGroup: "grow"
    });

    createController({
        buttonSelector: "[data-shrink]",
        targetSelector: ".item-shrink",
        outputSelector: ".shrink-value",
        descriptionSelector: ".shrink-description",
        datasetKey: "shrink",
        styleProperty: "flexShrink",
        descriptionGroup: "shrink"
    });

    createController({
        buttonSelector: "[data-basis]",
        targetSelector: ".item-basis",
        outputSelector: ".basis-value",
        descriptionSelector: ".basis-description",
        datasetKey: "basis",
        styleProperty: "flexBasis",
        descriptionGroup: "basis"
    });

    const flexItem = getElement(".item-flex");
    const flexGrowValue = getElement(".flex-grow-value");
    const flexShrinkValue = getElement(".flex-shrink-value");
    const flexBasisValue = getElement(".flex-basis-value");

    function updateFlexDetails() {
        if (!flexItem || !flexGrowValue || !flexShrinkValue || !flexBasisValue) {
            return;
        }

        const computedStyle = getComputedStyle(flexItem);
        flexGrowValue.textContent = computedStyle.flexGrow;
        flexShrinkValue.textContent = computedStyle.flexShrink;
        flexBasisValue.textContent = computedStyle.flexBasis;
    }

    createController({
        buttonSelector: "[data-flex]",
        targetSelector: ".item-flex",
        outputSelector: ".flex-value",
        descriptionSelector: ".flex-description",
        datasetKey: "flex",
        styleProperty: "flex",
        descriptionGroup: "flex",
        afterChange: updateFlexDetails
    });

    createController({
        buttonSelector: "[data-align-self]",
        targetSelector: ".item-align-self",
        outputSelector: ".align-self-value",
        descriptionSelector: ".align-self-description",
        datasetKey: "alignSelf",
        styleProperty: "alignSelf",
        descriptionGroup: "alignSelf"
    });

    const shrinkContainer = getElement(".shrink-container");
    const shrinkWidthButtons = document.querySelectorAll("[data-shrink-width]");

    shrinkWidthButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (!shrinkContainer) {
                return;
            }

            shrinkContainer.style.width = button.dataset.shrinkWidth;
            setActiveButton(button, "[data-shrink-width]");
        });
    });

    document.querySelectorAll(".copy-button").forEach(button => {
        button.addEventListener("click", async () => {
            const property = button.dataset.copyProperty;
            const target = getElement(button.dataset.copyTarget);

            if (!property || !target) {
                return;
            }

            const css = `${property}: ${target.textContent.trim()};`;
            const originalText = button.textContent;

            try {
                await navigator.clipboard.writeText(css);
                button.textContent = "CSS copiado!";
                button.classList.add("copy-success");
            } catch (error) {
                console.error("Erro ao copiar CSS:", error);
                button.textContent = "Não foi possível copiar";
            }

            window.setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove("copy-success");
            }, 1600);
        });
    });

    const resetActions = {
        direction: () => resetController({
            buttonSelector: "[data-direction]",
            targetSelector: ".direction-container",
            outputSelector: ".direction-value",
            descriptionSelector: ".direction-description",
            datasetKey: "direction",
            styleProperty: "flexDirection",
            defaultValue: "row",
            descriptionGroup: "direction",
            afterReset: updateDirectionAxes
        }),
        justify: () => resetController({
            buttonSelector: "[data-justify]",
            targetSelector: ".justify-container",
            outputSelector: ".justify-value",
            descriptionSelector: ".justify-description",
            datasetKey: "justify",
            styleProperty: "justifyContent",
            defaultValue: "flex-start",
            descriptionGroup: "justify"
        }),
        align: () => resetController({
            buttonSelector: "[data-align]",
            targetSelector: ".align-container",
            outputSelector: ".align-value",
            descriptionSelector: ".align-description",
            datasetKey: "align",
            styleProperty: "alignItems",
            defaultValue: "stretch",
            descriptionGroup: "align"
        }),
        gap: () => resetController({
            buttonSelector: "[data-gap]",
            targetSelector: ".gap-container",
            outputSelector: ".gap-value",
            descriptionSelector: ".gap-description",
            datasetKey: "gap",
            styleProperty: "gap",
            defaultValue: "10px",
            descriptionGroup: "gap"
        }),
        wrap: () => resetController({
            buttonSelector: "[data-wrap]",
            targetSelector: ".wrap-container",
            outputSelector: ".wrap-value",
            descriptionSelector: ".wrap-description",
            datasetKey: "wrap",
            styleProperty: "flexWrap",
            defaultValue: "nowrap",
            descriptionGroup: "wrap"
        }),
        flow: () => resetController({
            buttonSelector: "[data-flow]",
            targetSelector: ".flow-container",
            outputSelector: ".flow-value",
            descriptionSelector: ".flow-description",
            datasetKey: "flow",
            styleProperty: "flexFlow",
            defaultValue: "row nowrap",
            descriptionGroup: "flow"
        }),
        alignContent: () => resetController({
            buttonSelector: "[data-align-content]",
            targetSelector: ".align-content-container",
            outputSelector: ".align-content-value",
            descriptionSelector: ".align-content-description",
            datasetKey: "alignContent",
            styleProperty: "alignContent",
            defaultValue: "stretch",
            descriptionGroup: "alignContent"
        }),
        order: () => resetController({
            buttonSelector: "[data-order]",
            targetSelector: ".item-order",
            outputSelector: ".order-value",
            descriptionSelector: ".order-description",
            datasetKey: "order",
            styleProperty: "order",
            defaultValue: "0",
            descriptionGroup: "order"
        }),
        grow: () => resetController({
            buttonSelector: "[data-grow]",
            targetSelector: ".item-grow",
            outputSelector: ".grow-value",
            descriptionSelector: ".grow-description",
            datasetKey: "grow",
            styleProperty: "flexGrow",
            defaultValue: "1",
            descriptionGroup: "grow"
        }),
        shrink: () => {
            resetController({
                buttonSelector: "[data-shrink]",
                targetSelector: ".item-shrink",
                outputSelector: ".shrink-value",
                descriptionSelector: ".shrink-description",
                datasetKey: "shrink",
                styleProperty: "flexShrink",
                defaultValue: "1",
                descriptionGroup: "shrink"
            });

            if (shrinkContainer) {
                shrinkContainer.style.width = "500px";
                setActiveByValue("[data-shrink-width]", "shrinkWidth", "500px");
            }
        },
        basis: () => resetController({
            buttonSelector: "[data-basis]",
            targetSelector: ".item-basis",
            outputSelector: ".basis-value",
            descriptionSelector: ".basis-description",
            datasetKey: "basis",
            styleProperty: "flexBasis",
            defaultValue: "auto",
            descriptionGroup: "basis"
        }),
        flex: () => resetController({
            buttonSelector: "[data-flex]",
            targetSelector: ".item-flex",
            outputSelector: ".flex-value",
            descriptionSelector: ".flex-description",
            datasetKey: "flex",
            styleProperty: "flex",
            defaultValue: "0 1 auto",
            descriptionGroup: "flex",
            afterReset: updateFlexDetails
        }),
        alignSelf: () => resetController({
            buttonSelector: "[data-align-self]",
            targetSelector: ".item-align-self",
            outputSelector: ".align-self-value",
            descriptionSelector: ".align-self-description",
            datasetKey: "alignSelf",
            styleProperty: "alignSelf",
            defaultValue: "auto",
            descriptionGroup: "alignSelf"
        })
    };

    document.querySelectorAll("[data-reset-section]").forEach(button => {
        button.addEventListener("click", () => {
            const section = button.dataset.resetSection;

            if (section === "challenge") {
                resetChallenge();
                return;
            }

            const action = resetActions[section];

            if (typeof action === "function") {
                action();
            }
        });
    });

    const challengeContainer = getElement(".challenge-container");
    const challengeDirection = getElement(".challenge-direction");
    const challengeJustify = getElement(".challenge-justify");
    const challengeAlign = getElement(".challenge-align");
    const checkButton = getElement(".check-button");
    const challengeFeedback = getElement(".challenge-feedback");

    function updateChallenge() {
        if (!challengeContainer || !challengeDirection || !challengeJustify || !challengeAlign) {
            return;
        }

        challengeContainer.style.flexDirection = challengeDirection.value;
        challengeContainer.style.justifyContent = challengeJustify.value;
        challengeContainer.style.alignItems = challengeAlign.value;
    }

    function resetChallenge() {
        if (!challengeDirection || !challengeJustify || !challengeAlign || !challengeFeedback) {
            return;
        }

        challengeDirection.value = "row";
        challengeJustify.value = "flex-start";
        challengeAlign.value = "stretch";
        challengeFeedback.textContent = "Altere as propriedades e verifique sua resposta.";
        challengeFeedback.className = "challenge-feedback";
        updateChallenge();
    }

    [challengeDirection, challengeJustify, challengeAlign].forEach(select => {
        if (select) {
            select.addEventListener("change", updateChallenge);
        }
    });

    if (checkButton) {
        checkButton.addEventListener("click", () => {
            if (!challengeDirection || !challengeJustify || !challengeAlign || !challengeFeedback) {
                return;
            }

            const isCorrect =
                challengeDirection.value === "row" &&
                challengeJustify.value === "center" &&
                challengeAlign.value === "center";

            if (isCorrect) {
                challengeFeedback.textContent = "Parabéns! Os itens estão centralizados nos dois eixos.";
                challengeFeedback.className = "challenge-feedback success";
            } else {
                challengeFeedback.textContent = "Ainda não. Observe o eixo principal e o eixo secundário e tente novamente.";
                challengeFeedback.className = "challenge-feedback error";
            }
        });
    }

    updateFlexDetails();
    updateDirectionAxes("row");
    updateChallenge();
});
