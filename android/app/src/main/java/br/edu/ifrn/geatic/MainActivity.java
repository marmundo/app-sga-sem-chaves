package br.edu.ifrn.geatic;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SGASemChaves";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
      AppCenter.start(getApplication(), "3ba39072-4fd5-4d23-9655-37bf37f415c1", Analytics.class, Crashes.class);
      SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
