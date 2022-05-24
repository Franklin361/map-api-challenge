# Show Modal Dialogs 💬

Este proyecto consta de mostrar modales de dialogo basado en componentes de React JS.

![image](https://res.cloudinary.com/dnxchppfm/image/upload/v1653078455/2022-05-20_15-19-34_krxmqy.gif)

## API/Component

HomePage/index.tsx

```javascript
<main>
    <div className="container-btns">
        {
            buttons.map( ({ icon, label }) => (
                <ButtonDialog
                    key={icon}
                    onClick={() => handleOpenModal(icon)}
                    label={label}
                    icon={icon}
                />
            ))
        }
    </div>

    {
        isOpenModal && <ModalDialog {...{ handleCloseModal, isOpenModal, type }} />
    }
</main>
```

En el componente HomePage contiene los botones para desplegar los modales de dialogo.\
El arreglo de "buttons" consiste en varios objetos con la como el siguiente:

 ```javascript
    const buttons: Pick<PropsButton, 'icon' | 'label'>[] = [
        {
            icon: 'warning',
            label: 'Warning Dialog'
        },
        {
            icon: 'error',
            label: 'Error Dialog'
        },
        {
            icon: 'success',
            label: 'Success Dialog'
        }
    ]
 ```
Y para cada botón, hay un modal que se idenfica mediante el valor de la propiedad "icono" de la constante "buttons".

---
components/ModalDialog/Modal.tsx
```javascript
export const Modal = (props: PropsModal) => {

    const { isOpenModal, handleCloseModal } = props;

    return (
        <dialog 
            open={isOpenModal} 
            className='modal-overlay' 
            onClick={handleCloseModal}
        >
            <div 
                className='modal-container' 
                onClick={handleStopPropagation}
            >
                { showModalDetails(props) }
                
                <ButtonCloseModal handleCloseModal={handleCloseModal} />
            </div>
        </dialog>
    )
}

```

---
utils/showModalDetails.tsx
```javascript
export const showModalDetails = (props: PropsModal) => {

    const selectedModal = {
        "warning": <WarningModal {...props} />,
        "success": <SuccessModal {...props} />,
        "error": <ErrorModal {...props} />
    }

    return selectedModal[props.type!]
}
```


## Installation

1. Clone the repository (you need to have [Git](https://git-scm.com) installed).

```shell
    git clone https://github.com/Franklin361/challenge-dialog-design-system.git
```

2.  Install dependencies of the project.

```shell
    npm install
```

3. Run the project.
```shell
    npm run dev
```

Note: For running the tests, use the following command 

```shell
    npm run test
```

## Demo
[Demo de la aplicación](https://show-modal-dialogs.netlify.app/)

## License 

Inlcuir la licéncia y el link a esta
[MIT](https://opensource.org/licenses/MIT)