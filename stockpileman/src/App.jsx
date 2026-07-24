/**
 * @fileoverview This is a part of StockpileMan
 * @copyright Copyright (C) 2026 Tayra Sakurai
 * @license This is a part of StockpileMan
 * Copyright (C) 2026 Tayra Sakurai
 * 
 * StockpileMan is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * StockpileMan is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with StockpileMan. If not, see <https://www.gnu.org/licenses/>.
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Copyright from './Components/Copyright.jsx';
import MenuComponent from './Components/MenuComponent.jsx';
import ItemEdit from './Components/ItemEdit.jsx';
import { Container } from 'react-bootstrap';
import ItemAdd from './Components/ItemAdd.jsx';
import ItemView from './Components/Views/ItemView.jsx';
import FilteredResult from './Components/FilteredResult.jsx';
import ViewBase from './Components/Views/ViewBase.jsx';
import CategoriesView from './Components/CategoryDetails/CategoriesView.jsx';
import liff from '@line/liff';
import { supabase } from './client';

function App() {
  liff.init({
    liffId: import.meta.env.VITE_LIFF_ID,
  })
    .then(
      () => {
        if (!liff.isLoggedIn())
          liff.login();
        supabase.auth.getUser()
          .then(
            ({ data: { user }, error }) => {
              if (error || !user)
                supabase.auth.signInWithOAuth({
                  provider: 'custom:line'
                });
            }
          );
      }
    );

  return (
    <BrowserRouter>
      <header className="sticky-top">
        <MenuComponent />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<FilteredResult />} />
            <Route path="/View" element={<ViewBase />}>
              <Route path="Items" element={<ItemView />} />
              <Route path="Categories" element={<CategoriesView />} />
            </Route>
            <Route path="/Add" element={<ItemAdd />} />
            <Route path="/Edit/:id" element={<ItemEdit />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <Copyright />
      </footer>
    </BrowserRouter>
  )
}

export default App
