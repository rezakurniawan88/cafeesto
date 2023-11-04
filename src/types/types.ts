//Auth
export interface IDataLogin {
  email: string;
  password: string | number;
}

export interface IDataRegister {
  name: string;
  email: string;
  password: string | number;
}

export interface IDataUser {
  id: number;
  name: string;
  email: string;
  role: number;
  created_at: Date;
  updated_at: Date;
}


//Menus
export interface IDataMenu {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  menuQty: number;
}

export interface ICategoryMenu {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}


//Orders
export interface IDataOrder {
  id: number;
  name: string;
  date: string;
  table_number: number;
  items: ItemCheckout[];
  options: string;
  total_price: number;
  completion_status: number;
  created_at: string;
  updated_at: string;
  table: ITableProps;
}

type TOrderByCategoryProps = {
  [key: string]: number
}

export interface IDataOrdersByCategoryResponse {
  orderByCategory: TOrderByCategoryProps
}

type TWeeklyIncomeProps = {
  [date: string]: string|number
}

export interface IDataWeeklyOrdersResponse {
  weeklyIncome: TWeeklyIncomeProps
}

type ItemCheckout = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at: string;
  updated_at: string;
  menuQty: number;
};


//Tables
export interface ITableProps {
  id: number;
  table_number: number;
  status: number;
  created_at: string;
  updated_at: string;
}


//Charts
export interface LineChartData {
  series: { name: string; data: number[] }[];
  options: {
    chart: {
      height: number;
      type: 'line';
      zoom: {
        enabled: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    stroke: {
      curve: 'straight';
    };
    title: {
      text: string;
      align: 'left';
    };
    grid: {
      row: {
        colors: string[];
        opacity: number;
      };
    };
    xaxis: {
      categories: string[];
    };
  };
}


//Error
export interface IErrorResponse {
    error: string;
}