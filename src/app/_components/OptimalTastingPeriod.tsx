import React, {type FC} from "react";
import {HeartIcon} from "lucide-react";
import cx from "classnames";
import { Tables } from "../../../schema.gen";

interface TastingPeriodProps {
  periods?: {
    cheese_id: number;
    optimal_tasting_period_id: number;
  }[]
}

export const OptimalTastingPeriod: FC<TastingPeriodProps> = ({ periods }) => {
  const months = [
    { id: 1, month: "Janvier" },
    { id: 2, month: "Février" },
    { id: 3, month: "Mars" },
    { id: 4, month: "Avril" },
    { id: 5, month: "Mai" },
    { id: 6, month: "Juin" },
    { id: 7, month: "Juillet" },
    { id: 8, month: "Août" },
    { id: 9, month: "Septembre" },
    { id: 10, month: "Octobre" },
    { id: 11, month: "Novembre" },
    { id: 12, month: "Décembre" },
  ];

  if (!periods) return null;

  return (
    <div className="mt-4 flex flex-row gap-6">
      <div className="flex w-1/2 flex-col gap-2">
        {months.slice(0, 5).map((month) => (
          <div
            key={month.id}
            className={cx("flex flex-row items-center gap-2 text-gray-400", {
              "!text-cheese": periods.find(
                (p) => p.optimal_tasting_period_id === month.id,
              ),
            })}
          >
            <HeartIcon
              className={cx("h-6 w-6", {
                "fill-cheese text-cheese": periods.find(
                  (p) => p.optimal_tasting_period_id === month.id,
                ),
              })}
            />
            <span>{month.month}</span>
          </div>
        ))}
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        {months.slice(6, 11).map((month) => (
          <div
            key={month.id}
            className={cx("flex flex-row items-center gap-2 text-gray-400", {
              "!text-cheese": periods.find(
                (p) => p.optimal_tasting_period_id === month.id,
              ),
            })}
          >
            <HeartIcon
              className={cx("h-6 w-6", {
                "fill-cheese text-cheese": periods.find(
                  (p) => p.optimal_tasting_period_id === month.id,
                ),
              })}
            />
            <span>{month.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
