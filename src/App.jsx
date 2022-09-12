
import { useEffect, useState } from 'react';
import './App.css';
import Item from './components/Item';
import Menu from './components/Menu';
import Panel from './components/Panel';
import List from './components/List';
import Editor from './components/Editor';
import Preview from './components/Preview';
import uuid from 'react-uuid';
import useDocumentTitle from './Hooks/useDocumentTitle';
import itemsContext from './Context/ItemsContext';
import { get, post, put } from './lib/ServerConexion';
import StatusContext from './Context/StatusContext';



function App() {

  const [items, setItems] = useState([])
  const [actualIndex, setActualIndex] = useState(-1)
  const [copyItems, setCopyItems] = useState([])
  const URL = 'http://localhost:3010/'
  const [lock, setLock] = useState(false)
  const [status, setStatus] = useState(0)


  useDocumentTitle(copyItems[actualIndex]?.title, 'note')

  useEffect(() => {
    getItems();
  }, [])

  async function getItems() {
    let data = await get(`${URL}`)
    let res = getOrderedNotes(data)

    setItems(res)
    setCopyItems(res)

    if (items.length > 0) setActualIndex(0)
  }

  async function handleNew() {
    const note = {
      id: uuid(),
      title: 'Nuevo',
      text: ' Lorem ipsum dolor sit amet.',
      pinned: false,
      created: Date.now()
    }

    let notes = [...items]
    notes.unshift(note)
    let res = getOrderedNotes(notes)

    setItems(res)
    setCopyItems(res)

    const data = await post(`${URL}new`, note)
  }

  function handleSelectNote(item, e) {

    if (!e.target.classList.contains('note')) return;

    const index = items.findIndex(x => x === item);
    setActualIndex(index)
  }

  function handlePinned(item, i) {
    setActualIndex(i)
    let id = item.id
    let notes = [...items]
    notes[i].pinned = !notes[i].pinned

    let res = getOrderedNotes(notes)
    setItems(res)
    setCopyItems(res)
    let index = res.findIndex(x => x.i === id)
    setActualIndex(index)
  }

  function getOrderedNotes(arr) {
    let items = [...arr]
    let pinned = items.filter(x => x.pinned === true)
    let rest = items.filter(x => x.pinned === false)

    pinned = sortByDate(pinned, true)
    rest = sortByDate(rest, true)

    return [...pinned, ...rest]
  }

  function sortByDate(arr, asc = false) {
    if (asc) return arr.sort((a, b) => new Date(b.created) - new Date(a.created))
    return arr.sort((a, b) => new Date(a.created) - new Date(b.created))

  }

  function onChangeTitle(e) {
    const title = e.target.value;
    let notes = [...items]
    notes[actualIndex].title = title

    setItems(notes)
    setCopyItems(notes)
  }

  function onChangeText(e) {
    const text = e.target.value;
    let notes = [...items]
    notes[actualIndex].text = text;
    setItems(notes)
    setCopyItems(notes)
  }


  function autoSave() {
    if (!lock) {
      setLock(true)
      setStatus(1)
      setTimeout(() => {
        save()
        setLock(false)
      }, 3000);
    }
  }

  async function save() {
    const item = items[actualIndex]
    const response = await put(`${URL}update`, item)
    
    setStatus(2)

    setTimeout(() => {
      setStatus(0)
    }, 1000);

  }

  function renderEditorAndPreviewUI() {
    return (
      <>
        <StatusContext.Provider value={{ status: status, autoSave: autoSave }}>
          <Editor item={copyItems[actualIndex]} onChangeTitle={onChangeTitle} onChangeText={onChangeText} />
        </StatusContext.Provider>
        <Preview text={copyItems[actualIndex].text} title={copyItems[actualIndex].title} />
      </>
    )
  }
  


  function handleSearch(e) {
    const q = e.target.value

    if (q === '') {
      setCopyItems([...items])
    } else {
      let res = items.filter(x => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0)

      if (res.length === 0) {
        setActualIndex(-1);
      }
      else {
        setCopyItems([...res])
        setActualIndex(0)
      }
    }


  }
  return (
    <div className="App container">
      <Panel>
        <itemsContext.Provider value={{ onSearch: handleSearch, onNew: handleNew }} >
          <Menu />
        </itemsContext.Provider>


        <List >
          {
            copyItems.map((item, i) => {
              return <Item
                key={item.id}
                item={item}
                actualIndex={actualIndex}
                index={i}
                onHandlePinned={handlePinned}
                onHandleSelectNote={handleSelectNote} />
            })
          }
        </List>
      </Panel>

      <>
        {
          (actualIndex >= 0) ? renderEditorAndPreviewUI() : ''
        }
      </>


    </div>
  );
}

export default App;
