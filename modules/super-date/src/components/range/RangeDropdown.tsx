// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { Popover, Tabs } from "antd";
import React, { RefObject, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { superDateType } from "../../utils/dateUtils";
import { I18nKey } from "../../utils/i18nKey";
import { BaseProps, Type } from "../../utils/types";
import { RangePicker } from "./RangePicker";
import { RangePresets } from "./RangePresets";
import { RelativeForm } from "./RelativeForm";

export const RangeDropdown: React.FC<
  {
    dropdown: RefObject<Popover>;
  } & BaseProps
> = React.memo(({ dropdown: { current: popup }, ...props }) => {
  const { t } = useTranslation(I18nKey);

  const activeTab = useMemo<Type>(() => superDateType(props.value), [props.value]);

  return (
    <Tabs
      destroyInactiveTabPane
      defaultActiveKey={activeTab}
      animated={{ tabPane: false, inkBar: true }}
      onChange={() => {
        popup && popup.forceUpdate();
      }}
    >
      <Tabs.TabPane key={Type.QUICK} tab={t("label.quick")}>
        <RangePresets {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane key={Type.RELATIVE} tab={t("label.relative")}>
        <RelativeForm {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane key={Type.ABSOLUTE} tab={t("label.absolute")}>
        <RangePicker {...props} />
      </Tabs.TabPane>
    </Tabs>
  );
});
RangeDropdown.displayName = "RangeDropdown";
